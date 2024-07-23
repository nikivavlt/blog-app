import { database } from '../config/database.js';
import jwt, { type Secret } from 'jsonwebtoken';
import generateUrlSlug from '../utils/slug-generator.js';
import type { Request, Response } from 'express';

// Comments for TO DO - Good practice
// SINGLE TASK FOR FUNCTION
// In JavaScript && operator returns the first value if it's falsy or the second one if not.
export const getArticles = (request: Request, response: Response): void => {
  // add this one to qery
  const startIndex = parseInt(request.query.startIndex) || 0;
  const endIndex = parseInt(request.query.endIndex) || 8;
  const sortDirection = request.query.order === 'ascending' ? 1 : -1;

  const { category } = request.query;

  // Article.getArticles((error, data) => {
  //   if (error) {
  //     response.status(500).send(error);
  //     return;
  //   }

  //   if (data.length === 0) {
  //     response.status(204).send();
  //     return;
  //   }

  //   response.status(200).json(data);
  // }, categoryName);

  const testQuery = request.query.category
    ? 'SELECT a.*, c.name as category FROM articles a JOIN categories c ON a.category_id=c.id WHERE c.name=?'
    : 'SELECT * FROM articles';

  const query = request.query.category
    ? 'SELECT * FROM articles WHERE category=?'
    : 'SELECT * FROM articles';

  // check if it exists and return 204 `No employee matches ID ${req.body.id}.`

  database.query(testQuery, [request.query.category], (error, data) => {
    if (error !== null) {
      response.status(500).send(error);
      return; // rewrite using next()
    }

    response.status(200).json(data);
  });
};

export const getArticle = (request: Request, response: Response) => {
  const query = 'SELECT `username` as author, a.id as article_id, u.id as author_id, `title`, `description`, `url`, a.id, a.image, u.image AS authorImage, c.name AS category, `created_at` FROM users u JOIN articles a ON u.id=a.author_id JOIN categories c ON a.category_id=c.id WHERE a.url = ?';
  // check if article id required - send 400
  // if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
  const url = String(request.params.url);
  database.query(query, [url], (error, data) => { // HARDCODED request.params.url!!!
    if (error !== null) return response.status(500).send(error);
    // 204 instead
    //   if (!employee) {
    //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    // }
    if (data.length === 0) return response.status(404).json('Article not found!');
    // implement different service and model
    const query = 'SELECT c.content, c.user_id, c.created_at, c.updated_at, u.username FROM comments c JOIN users u ON c.user_id=u.id WHERE c.article_id = ?';

    database.query(query, data[0].id, (error, commentsData) => {
      if (error) return response.status(500).send(error);
      // update field "views" increment it

      return response.status(200).json({ article: data[0], comments: commentsData });
    });
  });
};

// createArticle
export const createArticle = (request: Request, response: Response): void => {
  // const currentDate = generateCurrentDate(new Date());
  // const articleUrl = generateArticleUrl(request.body.title);
  const token: string = request.cookies.refresh_token;

  if (token === null) {
    response.status(401).json('Not authenticated!');
    return;
  }

  if (request.body.title === null || request.body.description === null) { // add all others fields
    // return next(errorHandler(400, 'Please provide all required fields'));
  }

  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (secret === undefined) throw Error('REFRESH_TOKEN_SECRET is not defined');

  jwt.verify(token, secret, (error, userData) => {
    if (error !== null) return response.status(403).json('Token is not valid!');

    // generate articles url function
    // add is_admin boolean value or roles
    // rename image as avatar

    const url = generateUrlSlug(request.body.title as string);

    const query = 'INSERT INTO articles(`title`, `description`, `image`, `url`, `category_id`, `created_at`, `updated_at`, `author_id`, `likes`) VALUES (?)';
    // desctructure request.body object since you will use model instead this

    // if category not selected - set default category
    const values = [
      request.body.title,
      request.body.description,
      request.body.image,
      url,
      request.body.categoryId,
      request.body.date,
      request.body.date,
      userData?.id,
      0 // hardcoded value
    ];

    // const values = {
    //   title: request.body.title,
    //   description: request.body.description,
    //   image: request.body.image,
    //   url: request.body.url,
    //   categoryId: request.body.categoryId,
    //   authorId: request.body.authorId,
    //   createdAt: currentDate,
    //   updatedAt: currentDate,
    // };

    // Article.createArticle((error, data) => {
    //   if (error) {
    //     response.status(500).send(error);
    //     return;
    //   }

    //   response.status(201).json('The article was successfully created');
    // }, values);

    database.query(query, [values], (error, data) => {
      if (error !== null) return response.status(500).json(error);
      // status 201
      return response.json('Post has been created.');
    });
  });
};

export const deleteArticle = (request: Request, response: Response) => {
  const token: string = request.cookies.refresh_token;

  if (token === null) return response.status(401).json('Not authenticated!');

  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (secret === undefined) throw Error('REFRESH_TOKEN_SECRET is not defined');

  jwt.verify(token, secret, (error, userData) => {
    if (error != null) return response.status(401).json('Token is not valid!');

    const url = request.params.url;

    // check if id provided - send 400

    const query = 'DELETE FROM articles WHERE `url` = ? AND `author_id` = ?';

    // add check if it exists and return 204 `No employee matches ID ${req.body.id}.`

    database.query(query, [url, userData.id], (error, data) => {
      if (error !== null) return response.status(403).json('You can delete only your articles!');

      return response.json(`Post ${url} has been deleted!`);
    });
  });
};

export const updateArticle = (request: Request, response: Response) => {
  const token: string = request.cookies.refresh_token;
  // check if ID provided

  if (token === null) {
    response.status(401).json('Not authenticated!');
    return;
  }

  const secret: Secret | undefined = process.env.REFRESH_TOKEN_SECRET;

  if (secret === undefined) throw Error('REFRESH_TOKEN_SECRET is not defined');

  // add service here or middleware instead
  jwt.verify(token, secret, (error, userData) => {
    if (error != null) return response.status(401).json('Token is not valid!');

    const postId = request.params.url;
    // if didn't find send 204 not found `No employee matches ID ${req.body.id}.`

    const query = request.body.image === undefined
      ? 'UPDATE articles SET `title`=?, `description`=? WHERE `id` = ? AND `author_id` = ?'
      : 'UPDATE articles SET `title`=?, `description`=?, `image`=? WHERE `id` = ? AND `author_id` = ?';

    // also update image_url if upload photo
    const values = request.body.image === undefined
      ? [
          request.body.title,
          request.body.description
        ]
      : [
          request.body.title,
          request.body.description,
          request.body.image
        ];

    database.query(query, [...values, postId, userData.id], (error, data) => {
      if (error !== null) return response.status(500).json(error);
      return response.json('Post has been updated.');
    });
  });
};
