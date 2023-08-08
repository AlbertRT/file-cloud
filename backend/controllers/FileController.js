import Folder from "../mongodb/models/Folder.js";
import User from "../mongodb/models/User.js";
import File from "../mongodb/models/File.js";
import random_string from "../utils/random_string.js";
import { rename, unlinkFile } from "../utils/fs.js";
import path from 'path';
import moment from 'moment';

export async function ls (req, res) {
    const {location} = req.params;
    const { user_folder, _id } = await User.findOne({ key: req.key });

    let path = `src/folders/`;
    let data = []

    if (location === 'root') {
        path = `src/folders/${user_folder}`;
    } else {
        path = `src/folders/${location}`
    }
    
    try {
        const folder = await Folder.find({ userId:  _id});
        const file =  await File.find({ userId: _id });
        
        data = [...file, ...folder];

        return res.status(200).json({
            ok: true,
            error: false,
            data
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }

}

export async function details (req, res) {
    const { id } = req.params;

    const file = await File.findOne({ id });
    if (!file) return res.status(404).json({
        error: true,
        ok: false,
        msg: "File Not Found!"
    });

    const { originalName, fileName, size, date_modified, mimetype, author, url } = file;

    return res.status(200).json({
        ok: true,
        error: false,
        data: {
            originalName, 
            fileName,
            size,
            date_modified,
            mimetype,
            author,
            url
        }
    })
}

export async function uploadFile (req, res) {
    const { originalname, path, filename, size, mimetype } = req.file;
    const key = req.key;

    // User
    const user = await User.findOne({ key });
    const id = random_string(32)

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User Not Found!"
        });
    }

    const folder = await Folder.findOne({ name: req.body.folder_name });

    let newUserStorage = user.storage + size;
    let downloadURL = `http://localhost:5050/download/file/${id}`

    try {
        
        await File.create({
            id,
            fileName: filename,
            mimetype,
            originalName: originalname,
            path,
            size,
            userId: user._id,
            date_modified: moment().unix(),
            url: downloadURL,
            author: user.username,
            folderId: folder?._id
        });
        await User.updateOne({
            key
        }, {
            storage: newUserStorage
        });

        return res.status(200).json({
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
    let { oldName, newName } = req.body;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    const file = await File.findOne({
        originalName: oldName
    });
    const { user_folder } = await User.findOne({ key: req.key });

    if (!file) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Found"
        });
    }

    try {
        const newUniqName = `images-${uniqueSuffix}.${file.originalName.split(".")[1]}`

        await rename(file.path, path.join(`src/folders/${user_folder}`, newUniqName));
        await File.updateOne({
            originalName: oldName
        }, {
            originalName: newName,
            fileName: newUniqName,
            path: `src/folders/${user_folder}/${newUniqName}`
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
    
    let { storage } = await User.findOne({ key: req.key });

    if (!file) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Found"
        });
    }

    try {
        await unlinkFile(file.path);
        await File.deleteOne({ path: file.path });

        const newStorageSize = storage - file.size;

        await User.updateOne({
            key: req.key
        }, {
            storage: newStorageSize
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