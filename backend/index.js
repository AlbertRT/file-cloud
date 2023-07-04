import express from 'express';
import {config} from 'dotenv';
import Route from './routes/routes.js';
import connect from './mongodb/connection.js';
import cookieParser from 'cookie-parser'
config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(Route);

connect({ uri: process.env.MongoDBURL });
app.listen(process.env.PORT ,() => console.log('Server listen on ' + process.env.PORT));