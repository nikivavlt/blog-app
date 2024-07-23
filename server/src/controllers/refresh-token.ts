import { deleteRefreshToken, getRefreshToken } from '../models/Token.js';
import { generateAccessToken } from '../utils/token-generator.js';
import jwt from 'jsonwebtoken';
import isValidToken from '../utils/token-verifier.js';
import type { Request, Response } from 'express';
import type IToken from 'src/interfaces/token.js';

const handleRefreshToken = (request: Request, response: Response): void => {
  // const authenticationHeader = request.headers.authorization || request.headers.Authorization;
  const refreshToken = request.cookies['refresh_token'];
  if (refreshToken === null) {
    response.status(401).json('Unauthorized!');
    return;
  }

  if (typeof refreshToken !== 'string') {
    throw new Error('Invalid token type'); // change it
  }

  // const accessToken = authenticationHeader.split(' ')[1];
  const { id: userId, username, role } = jwt.decode(refreshToken) as IToken; // use verify instead

  getRefreshToken(userId, (error, databaseRefreshToken) => {
    if (error !== null) console.log(error); // return 403 if not exists cookie

    const isTokensEqual = (refreshToken === databaseRefreshToken);

    if (!isTokensEqual) return response.status(401).json('Invalid refresh token.');

    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (secret === undefined) throw Error('REFRESH_TOKEN_SECRET is not defined');

    if (
      !isValidToken(refreshToken, secret)
    ) {
      deleteRefreshToken(userId, (error, data) => {
        if (error !== null) console.log(error);
      });

      return response.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'none', // strict instead
        secure: true
      }).status(401).json('Refresh token expired.');
    }

    const newAccessToken = generateAccessToken(userId, username, role);

    return response.status(200).json({ id: userId, username, newAccessToken });
  });
};

export default handleRefreshToken;
