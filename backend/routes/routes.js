import express from 'express';
import { login, logout, me, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';
import { createFolder, deleteFolder, detailsFolder, lsFolder, renameFolder } from '../controllers/FolderController.js';
import multer from 'multer';
import { uploadFile, renameFile, deleteFile, ls, details } from '../controllers/FileController.js';
import { download, share } from '../controllers/DownloadController.js';
import upload from '../middleware/upload.js';
import { accountDetails, deleteAccount, deleteProfilePicture, editInfo, getProfilePicture, profile_picture_update } from '../controllers/AccountController.js';
import { fileAccess } from '../middleware/fileAccess.js';
import random_string from '../utils/random_string.js';

const Route = express.Router();

// Authentication routes
Route.get('/user/me', cookieValidation, me)
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout);

// Files manager routes

// folders manager
Route.get('/user/board/ls', cookieValidation, lsFolder)
Route.post('/user/board/create', cookieValidation, createFolder);
Route.get('/user/board/details/:folderId', cookieValidation, detailsFolder);
Route.patch('/user/board/rename/:id', cookieValidation, renameFolder);
Route.delete('/user/board/delete', cookieValidation, deleteFolder);

// file manager
Route.get('/user/file', cookieValidation, ls);
Route.get('/user/file/details/:id', cookieValidation, details);
Route.post('/user/file/upload', cookieValidation, upload, uploadFile);
Route.patch('/user/file/rename/:id', cookieValidation, renameFile);
Route.delete('/user/file/delete', cookieValidation, deleteFile);

// download manager
Route.get('/download/:type/:id', download)
Route.get('/share/details/:type/:fileId', fileAccess, share)

// testing api
Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

// Account API

// Account Multer config
const accountInfo = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `${req.location}/details`
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const filename = `pp_${req.userId}.${file.originalname.split(".")[1]}`
        cb(null, filename);
    }
})

const profile_pictures_upload = multer({ storage: accountInfo })

Route.get('/account/details', cookieValidation, accountDetails);
Route.patch('/account/edit', cookieValidation, editInfo);
// Profile Picture
Route.post('/account/edit/profile_pictures', cookieValidation, profile_pictures_upload.single("profile_picture"), profile_picture_update);
Route.get('/pp/:fileName', getProfilePicture);
Route.delete('/account/delete/profile_pictures', cookieValidation, deleteProfilePicture)
Route.delete('/account/delete', cookieValidation, deleteAccount);

export default Route;