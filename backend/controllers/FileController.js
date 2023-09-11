import Folder from "../mongodb/models/Folder.js";
import User from "../mongodb/models/User.js";
import File from "../mongodb/models/File.js";
import random_string from "../utils/random_string.js";
import { unlinkFile } from "../utils/fs.js";
import moment from 'moment';

export async function ls(req, res) {
    const { basicInfo } = await User.findOne({ 'loginInfo.key': req.key });
    const { fullName, username } = basicInfo

    try {
        const files = await File.find({ 'author.name': fullName});

        return res.status(200).json({
            ok: true,
            error: false,
            data: [...files]
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
    const { altText, imageTitle, access } = req.meta_data
    const key = req.key;

    const user = await User.findOne({ 'loginInfo.key': key });
    const id = random_string(32);

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User Not Found!"
        });
    }

    let newUserStorage = user.basicInfo.storage + size;
    let downloadURL = `http://localhost:5050/download/file/${id}`

    try {
        await User.updateOne({ id: user.id }, { 'basicInfo.storage': newUserStorage })
        await File.create({
            id,
            originalname,
            filename,
            directory: path,
            size,
            date_modified: moment().unix(),
            url: downloadURL,
            author: {
                id: user.id,
                photo: user.basicInfo.profile_pictures.downloadURL,
                name: user.basicInfo.fullName
            },
            access,
            title: imageTitle,
            altText,
            mimetype,
            userId: user._id
        })

        return res.status(202).json({
            ok: true,
            error: false,
            msg: "Successfully upload one image"
        })

    } catch (error) {
        console.log(error);
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