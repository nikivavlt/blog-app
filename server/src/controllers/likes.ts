import type { Request, Response } from 'express';
import { database } from '../config/database.js'
import dateToString from '../utils/date-to-string.js';

const getLikes = (request: Request, response: Response): void => {
  const query = 'SELECT COUNT(*) as count FROM likes WHERE `liked_type` = "Article" AND liked_id = ?'
  // check if article id required - send 400
  // if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
  
  database.query(query, [request.params.id], (error, data) => { // HARDCODED request.params.url!!!
    if (error === null) return response.status(500).send(error);
    // 204 instead
    //   if (!employee) {
    //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    // }
    if (data.length === 0) return response.status(404).json('Likes not found!')
    // implement different service and model
    return response.status(200).send(data[0])
  });
};

const removeLike = (callback, article_id, user_id) => {
  const query = 'DELETE FROM likes WHERE `liked_type` = "Article" AND `liked_id` = ? AND `user_id` = ?';

  database.query(query, [article_id, user_id], (error, data) => { // HARDCODED request.params.url!!!
    // 204 instead
    //   if (!employee) {
    //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    // }
    // implement different service and model
    if (error) return callback(error, null)

    return callback(null, data)
    // return response.status(200).send(data[0])
  });
}

// toggleLike
const addLike = (request: Request, response: Response): void => {
  const { article_id, user_id } = request.body

  const currentDate = dateToString(new Date());

  const query = 'INSERT INTO likes(`liked_id`, `user_id`, `created_at`) VALUES (?)';

  database.query(query, [[article_id, user_id, currentDate]], (error, data) => { // HARDCODED request.params.url!!!
    if (error?.errno) {
      if (error.errno === 1062) {
        removeLike((sqlError, data) => {
          if (sqlError) return response.status(500).json(error);

          return response.status(200).json('Like successfully removed.');
        }, article_id, user_id);
        return;
      }
    }
    if (error) return response.status(500).send(error);
    // 204 instead
    //   if (!employee) {
    //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    // }
    // implement different service and model
    return response.status(200).json('Like successfully added.');
    // return response.status(200).send(data[0])
  });
};

// add like primary keys error!!! avoid dublicates
export { getLikes, addLike };
