import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;

app.listen(port);
