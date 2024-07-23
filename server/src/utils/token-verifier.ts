import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// verifyToken ...
const isValidToken = (token: string, secret: jwt.Secret): boolean => {
  try {
    // const decoded =
    jwt.verify(token, secret);
    // if (foundUser.username !== decoded.username) return res.sendStatus(403);
    return true;
  } catch (error) {
    return false;
  }
};

export default isValidToken;
