import express from 'express';
import { login, logout, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';
import { createFolder, deleteFolder, readFolder, renameFolder } from '../controllers/FilesController.js';

const Route = express.Router();

// Authentication routes
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout);

// Files manager routes

// folders manager
Route.post('/user/file/folder/create', cookieValidation, createFolder);
Route.patch('/user/file/folder/rename', cookieValidation, renameFolder);
Route.delete('/user/file/folder/delete', cookieValidation, deleteFolder);
Route.get('/user/file', cookieValidation, readFolder);


Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

export default Route;