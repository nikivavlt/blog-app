/* eslint-disable @typescript-eslint/dot-notation */
import dotenv from 'dotenv';
import type { RequestHandler } from 'express';

import isValidToken from '../utils/token-verifier.js';
import CustomError from '../errors/CustomErrror.js';

dotenv.config();

const authMiddleware: RequestHandler = (request, response, next) => {
  const authenticationHeader = request.headers.authorization ?? request.headers.Authorization;
  const refreshToken = request.cookies['refresh_token'];

  if (refreshToken === null) {
    next(new CustomError('Refresh token not found.', 401));
    return;
  }

  response.set({ 'Auth-Middleware': true });

  if (authenticationHeader === null) return response.sendStatus(401); // add comments json

  if (typeof authenticationHeader === 'string' && authenticationHeader?.startsWith('Bearer ')) {
    const accessToken: string = authenticationHeader.split(' ')[1];

    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (secret === undefined) throw Error('ACCESS_TOKEN_SECRET is not defined');

    return (isValidToken(accessToken, secret))
      ? response.status(200).json('Valid access token.')
      : response.status(401).json('Invalid access token.'); // 403 INSTEAD
    // create constants and pass username and userroles for next steps request.username = decoded.userData.username
    // req.user = decoded.UserInfo.username;
    // req.roles = decoded.UserInfo.roles;
  } else {
    return response.sendStatus(401); // add comments json
  }
};

export default authMiddleware;
