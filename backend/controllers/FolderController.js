import { readDir, createDir, rename, rmFolder } from "../utils/fs.js";
import User from "../mongodb/models/User.js";
import Folder from "../mongodb/models/Folder.js";
import random_string from "../utils/random_string.js";
import fs from 'fs';
import moment from 'moment';

export async function createFolder (req, res) {
    let { name, location } = req.body;
    const key = req.key;
    let path;
    const originalName = name;
    
    const user = await User.findOne({ key });

    // checking the name if name === root, rejected
    if (name === 'root') {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: `can't use ${name}`
        });
    }

    // check the is duplicate or not
    name = name.replace(" ", "_").toLowerCase();
    const isDuplicate = fs.existsSync(`src/folders/${user.user_folder}/${name}`);

    if (isDuplicate) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: `${name} is already in use, please use other name`
        });
    }

    if (location === 'root') {
        path = `${process.env.folderPath}${user.user_folder}/${name}`;
    } else {
        path = `${process.env.folderPath}${user.user_folder}/${location}/${name}` 
    }

    try {
        await createDir(path);
        await Folder.create({
            id: random_string(32),
            name,
            originalName,
            directory: path,
            mimetype: "folder",
            date_modified: moment().unix(),
            author: user.username,
            userId: user._id
        });

        return res.status(201).json({
            ok: true,
            error: false,
            msg: `${name} successfully created`
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,  
            msg: error.message
        });
    }
}

export async function renameFolder (req, res) {
    let { name, newName } = req.body;

    // original name
    const originalName = newName;

    // replace " " with "_" and make all string to lowercase
    name = name.replace(" ", "_").toLowerCase();
    newName = newName.replace(" ", "_").toLowerCase();

    const key = req.key;
    const user = await User.findOne({ key });


    // check if name is duplicate
    const isDuplicate = fs.existsSync(`src/folders/${user.user_folder}/${newName}`);

    if (isDuplicate) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: `${newName} is already in use, please use other name`
        });
    }
    try {
        await rename(`src/folders/${user.user_folder}/${name}`, `src/folders/${user.user_folder}/${newName}`);
        await Folder.updateOne({
            userId: user._id
        }, {
            name: newName,
            originalName,
            directory: `src/folders/${user.user_folder}/${newName}`,
        });
        return res.status(200).json({
            ok: true,
            error: false,
            msg: `${newName} successfully renamed`
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}
export async function deleteFolder (req, res) {
    const { id } = req.body 

    const folder = await Folder.findOne({ id });

    if (!folder) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "Folder not Found"
        });
    }

    try {
        await rmFolder(folder.directory);
        await Folder.deleteOne({ id });

        return res.status(200).json({
            ok: true,
            error: false,
            msg: "Successfully deleted"
        });

    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}