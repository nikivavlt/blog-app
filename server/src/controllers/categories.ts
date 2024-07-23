import { type Request, type Response } from 'express';
import { database } from '../config/database.js';

export const getCategories = (request: Request, response: Response) => {
  const query = 'SELECT * FROM categories';

  database.query(query, (error, data) => {
    if (error === null) return response.status(500).send(error);

    return response.status(200).json(data);
  });
};
