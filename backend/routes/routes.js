import express from 'express';
import { login, logout, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';
import { readFolder } from '../controllers/FilesController.js';

const Route = express.Router();

// Authentication routes
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout);

// Files manager routes

// folders manager
Route.post('/user/file/folder/create');
Route.patch('/user/file/folder/rename');
Route.delete('/user/file/folder/delete');
Route.get('/user/file',cookieValidation, readFolder);


Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

export default Route;