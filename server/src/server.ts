import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import corsOptions from './config/cors.js';
import authenticationMiddleware from './middlewares/authentication.js';
import authenticationRoutes from 'routes/authentication.js';
import refreshRoute from 'routes/refresh-token.js';
import usersRoutes from 'routes/users.js';
import articlesRoutes from 'routes/articles.js';
import categoriesRoute from 'routes/categories.js';
import uploadRoute from 'routes/upload.js';
import searchRoute from 'routes/search.js';
import commentsRoutes from 'routes/comments.js';
import likesRoutes from 'routes/likes.js';
import errorMiddleware from './middlewares/error.js';

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.static('src/uploads'));
// app.use(express.static(path.resolve('uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/auth', authenticationRoutes);
app.use('/refresh', refreshRoute);

app.use(authenticationMiddleware); // ?

app.use('/search', searchRoute);
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/categories', categoriesRoute);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);
app.use('/upload', uploadRoute);

// app.use(logger);
app.use(errorMiddleware);

app.listen(port);
