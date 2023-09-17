import { readDir, createDir, rename, rmFolder } from "../utils/fs.js";
import User from "../mongodb/models/User.js";
import Folder from "../mongodb/models/Folder.js";
import File from "../mongodb/models/File.js";
import random_string from "../utils/random_string.js";
import moment from 'moment';


export async function lsFolder(req, res) {
    const { basicInfo } = await User.findOne({ 'loginInfo.key': req.key });
    const { user_folder } = basicInfo

    const dir = `src/folders/${user_folder}`
    
    try {
        const folders = await readDir(dir)
        const folder = await Promise.all(folders.map(async (folder) => {
            const _folder = await Folder.findOne({ directory: `${dir}/${folder}` })
            return _folder
        }))
        const filteredFolder = folder.filter((item) => item !== null)

        return res.status(200).json({
            ok: true,
            error: false,
            data: filteredFolder
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            ok: false,
            msg: error.message
        })
    }
}

export async function detailsFolder(req, res) {
    const { folderId } = req.params

    const folder = await Folder.findOne({ id: folderId })

    if (!folder) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "Folder not Found"
        });
    }
    const { originalname, mimetype, name, directory, author, date_modified, id } = folder

    return res.status(200).json({
        ok: true,
        error: false,
        data: {
            originalname,
            mimetype,
            name,
            directory,
            author,
            date_modified,
            id
        }
    })
}

export async function createFolder (req, res) {
    let { name, access } = req.body;

    const id = random_string(32)
    const key = req.key;
    
    const user = await User.findOne({ 'loginInfo.key': key });
    let path = `src/folders/${user.basicInfo.user_folder}/${id}`;

    // checking the name if name === root, rejected
    if (name === 'root') {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: `can't use ${name}`
        });
    }

    try {
        await createDir(path);
        await Folder.create({
            id,
            name: id,
            originalname: name,
            directory: path,
            mimetype: "folder",
            date_modified: moment().unix(),
            author: user.basicInfo.fullName,
            access,
            userId: user._id
        });

        return res.status(201).json({
            ok: true,
            error: false,
            msg: `${name} successfully created`
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: true,
            ok: false,  
            msg: error.message
        });
    }
}

export async function editDetails (req, res) {
    const { originalname, access } = req.body
    const { id } = req.params

    const board = await Folder.findOne({ id })
    if (!board) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "Board not Found"
        });
    }
    
    try {
        await Folder.updateOne({ id }, { $set: { originalname, access } })
        return res.status(200).json({
            ok: true,
            error: false,
            msg: `successfully edit`
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
    console.log(id);

    const folder = await Folder.findOne({ id });
    const sizes = await File.find({ folderId: id })
    const totalFileSize = sizes.reduce((total, { size }) => total + size, 0);
    const { basicInfo } = await User.findOne({ 'loginInfo.key': req.key });

    if (!folder) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "Board not Found"
        });
    }

    try {
        await File.deleteMany({ folderId: id })
        await Folder.deleteOne({ id });
        await rmFolder(folder.directory);
        await User.updateOne({ 'loginInfo.key': req.key }, { 'basicInfo.storage': basicInfo.storage - totalFileSize });

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