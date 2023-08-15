import express from 'express';
import { login, logout, me, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';
import { createFolder, deleteFolder, detailsFolder, renameFolder } from '../controllers/FolderController.js';
import multer from 'multer';
import { uploadFile, renameFile, deleteFile, ls, details } from '../controllers/FileController.js';
import {download} from '../controllers/DownloadController.js';
import location from '../middleware/location.js';

const Route = express.Router();

// Authentication routes
Route.get('/user/me', cookieValidation, me)
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout);

// Files manager routes

// folders manager
Route.post('/user/file/folder/create', cookieValidation, location, createFolder);
Route.get('/user/file/folder/details/:folderId', cookieValidation, detailsFolder);
Route.patch('/user/file/folder/rename/:id', cookieValidation, location, renameFolder);
Route.delete('/user/file/folder/delete', cookieValidation, deleteFolder);


// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const location = req.location;
        
        cb(null, location);
    },
    filename: function (req, file, cb) {
        const file_name = req.file_name;

        cb(null, `${file_name}.${file.originalname.split(".")[1]}`);
    }
});
const upload = multer({ storage: storage });

// file manager
Route.get('/user/file/', cookieValidation, location, ls);
Route.get('/user/file/details/:id', cookieValidation, details);
Route.post('/user/file/upload', cookieValidation, location, upload.single("image"), uploadFile);
Route.patch('/user/file/rename/:id', cookieValidation, renameFile);
Route.delete('/user/file/delete', cookieValidation, deleteFile);

// download manager
Route.get('/download/:type/:id', download)

Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

export default Route;