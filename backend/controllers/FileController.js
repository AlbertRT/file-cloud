import Folder from "../mongodb/models/Folder.js";
import User from "../mongodb/models/User.js";
import File from "../mongodb/models/File.js";
import random_string from "../utils/random_string.js";
import { readDir, unlinkFile } from "../utils/fs.js";
import moment from 'moment';

export async function ls(req, res) {
    let location = req.location;
    const { basicInfo } = await User.findOne({ 'loginInfo.key': req.key });
    const { user_folder } = basicInfo

    let directory
    if (location === 'root') {
        directory = `src/folders/${user_folder}`;
    } else {
        directory = location;
    }


    try {
        const files = await readDir(directory);
        const file = await Promise.all(files.map(async (file) => {
            const _file = await File.findOne({ directory: `${directory}/${file}`, mimetype: 'image' });
            return _file;
        }));
        const filteredFile = file.filter(item => item !== null);

        return res.status(200).json({
            ok: true,
            error: false,
            data: [...filteredFile]
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }

}

export async function details(req, res) {
    const { id } = req.params;

    const file = await File.findOne({ id });
    if (!file) return res.status(404).json({
        error: true,
        ok: false,
        msg: "File Not Found!"
    });

    const { originalname, filename, size, date_modified, mimetype, author, url, access } = file;

    return res.status(200).json({
        ok: true,
        error: false,
        data: {
            originalname,
            filename,
            size,
            date_modified,
            mimetype,
            author,
            url,
            access
        }
    })
}

export async function uploadFile(req, res) {
    const { originalname, path, filename, size, mimetype } = req.file;
    const key = req.key;
    let folderId

    User
    const user = await User.findOne({ 'loginInfo.key': key });
    const id = random_string(32);
    const folder = await Folder.findOne({ directory: req.location });

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User Not Found!"
        });
    }

    let newUserStorage = user.basicInfo.storage + size;
    let downloadURL = `http://localhost:5050/download/file/${id}`

    if (req.location !== `src/folders/${user.basicInfo.user_folder}`) {
        folderId = folder.id;
    } else {
        folderId = ""
    }

    try {

        await File.create({
            id,
            filename: filename,
            mimetype: mimetype.split('/')[0],
            originalname: originalname,
            path,
            size,
            userId: user._id,
            date_modified: moment().unix(),
            url: downloadURL,
            author: user.basicInfo.fullName,
            directory: `${req.location}/${filename}`,
            folderId
        });
        await User.updateOne({
            'loginInfo.key': key
        }, {
            'basicInfo.storage': newUserStorage 
        });

        return res.status(202).json({
            ok: true,
            error: false,
            msg: "Successfully upload one image"
        })

    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}

export async function renameFile(req, res) {
    let { newName } = req.body;
    const { id } = req.params

    const file = await File.findOne({
        id
    });

    if (!file) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Found"
        });
    }

    try {
        await File.updateOne({
            id
        }, {
            originalname: newName,
        });

        return res.status(200).json({
            ok: true,
            error: false,
            msg: "Successfully rename"
        });
    } catch (error) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}

export async function deleteFile(req, res) {
    const { id } = req.body;

    const file = await File.findOne({
        id
    });

    let { basicInfo } = await User.findOne({ 'loginInfo.key': req.key });

    if (!file) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Found"
        });
    }

    try {
        await unlinkFile(file.directory);
        await File.deleteOne({ directory: file.directory });

        const newStorageSize = basicInfo.storage - file.size;

        await User.updateOne({
            'loginInfo.key': req.key
        }, {
            'basicInfo.storage': newStorageSize 
        });

        return res.status(200).json({
            ok: true,
            error: false,
            msg: "Successfully deleted"
        });
    } catch (error) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}