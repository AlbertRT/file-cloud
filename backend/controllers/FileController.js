import Folder from "../mongodb/models/Folder.js";
import User from "../mongodb/models/User.js";
import File from "../mongodb/models/File.js";
import random_string from "../utils/random_string.js";
import { rename, unlinkFile } from "../utils/fs.js";
import path from 'path';

export async function uploadFile (req, res) {
    const { originalname, path, filename, size, mimetype } = req.file;
    const key = req.key;

    // User
    const user = await User.findOne({ key });

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User Not Found!"
        });
    }

    const folder = await Folder.findOne({ name: req.body.folder_name });

    let newUserStorage = user.storage + size;

    try {
        
        await File.create({
            id: random_string(32),
            fileName: filename,
            mimetype,
            originalName: originalname,
            path,
            size,
            userId: user._id,
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
    const { name } = req.body;

    const file = await File.findOne({
        originalName: name
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