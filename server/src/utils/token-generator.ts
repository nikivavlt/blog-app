import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (id: number, username: string, role: string): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (secret === undefined) throw Error('ACCESS_TOKEN_SECRET is not defined');

  const token = jwt.sign({ id, username, role }, secret as jwt.Secret, { expiresIn: '10s' });
  return token;
};

const generateRefreshToken = (id: number, username: string, role: string): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (secret === undefined) throw Error('REFRESH_TOKEN_SECRET is not defined');

  const token = jwt.sign({ id, username, role }, secret as jwt.Secret, { expiresIn: '1d' });
  return token;
};

export {
  generateAccessToken,
  generateRefreshToken
};
