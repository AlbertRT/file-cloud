import express from 'express';
import {config} from 'dotenv';
import Route from './routes/routes.js';
import connect from './mongodb/connection.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';
config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use(Route);

connect({ uri: process.env.MongoDBURL });
app.listen(process.env.PORT ,() => console.log('Server listen on ' + process.env.PORT));