import express from 'express';
import { login, logout, me, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';
import { createFolder, deleteFolder, renameFolder } from '../controllers/FolderController.js';
import multer from 'multer';
import { uploadFile, renameFile, deleteFile, ls, details } from '../controllers/FileController.js';
import path from 'path';
import {download} from '../controllers/DownloadController.js';

const Route = express.Router();

// Authentication routes
Route.get('/user/me', cookieValidation, me)
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout);

// Files manager routes

// folders manager
Route.post('/user/file/folder/create', cookieValidation, createFolder);
Route.patch('/user/file/folder/rename', cookieValidation, renameFolder);
Route.delete('/user/file/folder/delete', cookieValidation, deleteFolder);


// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.folder_name;
        cb(null, path.join('src/folders', folder));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${file.originalname.split(".")[1]}`);
    }
});
const upload = multer({ storage: storage });

// file manager
Route.get('/user/file/:location', cookieValidation, ls);
Route.get('/user/file/details/:id', cookieValidation, details);
Route.post('/user/file/upload', cookieValidation, upload.single('image'), uploadFile);
Route.patch('/user/file/rename', cookieValidation, renameFile);
Route.delete('/user/file/delete', cookieValidation, deleteFile);

// download manager
Route.get('/download/:type/:id', download)

Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

export default Route;