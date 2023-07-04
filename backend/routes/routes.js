import express from 'express';
import { login, logout, register } from '../controllers/UserController.js';
import { cookieValidation } from '../middleware/cookieValidation.js';

const Route = express.Router();

// Authentication routes
Route.post('/user/register', register);
Route.post('/user/login', login);
Route.delete('/user/logout', cookieValidation, logout)


Route.get('/', cookieValidation, (req, res) => res.json({ ok: true }));

export default Route;