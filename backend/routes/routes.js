import express from 'express';
import { register } from '../controllers/UserController.js';

const Route = express.Router();

Route.post('/user/register', register)

export default Route;