import express from 'express';
import {config} from 'dotenv';
import Route from './routes/routes.js';
import connect from './mongodb/connection.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import bodyParser from 'body-parser';

config();

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(Route);

connect({ uri: process.env.MongoDBURL });
app.listen(process.env.PORT ,() => console.log('Server listen on ' + process.env.PORT));