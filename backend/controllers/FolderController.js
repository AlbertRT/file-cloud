import { readDir, createDir, rename, rmFolder } from "../utils/fs.js";
import User from "../mongodb/models/User.js";
import Folder from "../mongodb/models/Folder.js";
import random_string from "../utils/random_string.js";

export async function readFolder (req, res) {
    const key = req.key;
    
    if (!key) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'Key is Missing'
        });
    }
    
    const { user_folder } = await User.findOne({ key });

    if (!user_folder) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'Folder is not defined'
        });
    }

    try {
        const files = await readDir(process.env.folderPath + user_folder );

        return res.status(200).json({
            ok: true,
            error: false,
            data: files
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}

export async function createFolder (req, res) {
    let { name } = req.body;
    const key = req.key;
    
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

    try {
        await createDir(process.env.folderPath + `${user.user_folder}/` + name);
        await Folder.create({
            id: random_string(32),
            name,
            originalname: name,
            directory: process.env.folderPath + `${user.user_folder}/`, name,
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
            originalname: originalName,
            directory: `src/folders/${user.user_folder}/${newName}`
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
    let { name } = req.body;

    // replace " " with "_" and make all string to lowercase
    name = name.replace(" ", "_").toLowerCase();

    const key = req.key;
    const user = await User.findOne({ key });
    
    try {
        await rmFolder(`src/folders/${user.user_folder}/${name}`);
        await Folder.deleteOne({
            userId: user._id
        });
        return res.status(200).json({
            ok: true,
            error: false,
            msg: `${name} successfully deleted`
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}