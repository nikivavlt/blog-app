import type { Request, Response } from "express";
import database from "../config/database.js";

const getUser = (request: Request, response: Response): void => {
  const query = 'SELECT * FROM users WHERE LOWER(username) = ?';

  database.query(query, [request.params.username], (error, data) => {
    const { password, refresh_token, ...rest } = data[0];

    return response.status(200).json(rest);
  });
};

// getUsers
// if (!req.user.isAdmin) {
//   return next(errorHandler(403, 'You are not allowed to see all users'));
// }

// udate user
// if (req.body.password) {
//   if (req.body.password.length < 6) {
//     return next(errorHandler(400, 'Password must be at least 6 characters'));
//   }
//   req.body.password = bcryptjs.hashSync(req.body.password, 10);
// }
// if (req.body.username) {
//   if (req.body.username.length < 7 || req.body.username.length > 20) {
//     return next(
//       errorHandler(400, 'Username must be between 7 and 20 characters')
//     );
//   }
//   if (req.body.username.includes(' ')) {
//     return next(errorHandler(400, 'Username cannot contain spaces'));
//   }
//   if (req.body.username !== req.body.username.toLowerCase()) {
//     return next(errorHandler(400, 'Username must be lowercase'));
//   }
//   if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//     return next(
//       errorHandler(400, 'Username can only contain letters and numbers')
//     );
//   }
// }

export default getUser;

// getUserFriends

// removeFriend
// https://github.com/ed-roh/mern-social-media/blob/master/server/controllers/users.js