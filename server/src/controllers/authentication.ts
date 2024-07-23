import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/token-generator.js';
import User from '../models/User.js';
import { updateRefreshToken } from '../models/Token.js';
import type { NextFunction, Request, Response } from 'express';

const dayInMilliseconds = 24 * 60 * 60 * 1000;

// SINGLE TASK FOR FUNCTION
const signIn = (request: Request, response: Response, next: NextFunction): void => {
  const { username: requestUsername, password: requestPassword } = request.body;
  // email instead username?

  if (
    !requestUsername ||
    !requestPassword ||
    requestUsername === '' ||
    requestPassword === '') {
    return response.status(400).json('All fields are required'); // next (errorHandler)
  }

  User.getUserByName(requestUsername, (error, data) => {
    if (error !== null) return response.json(error);

    // use next to push errors return
    if (!data) return response.status(404).json('User not found.'); // 401 instead? User does not exist.

    const { id: databaseUserId, username: databaseUsername, password: databasePassword, role: databaseRole } = data;

    const isPasswordCorrect = bcrypt.compareSync(requestPassword, databasePassword);

    // isPasswordsEqual
    if (!isPasswordCorrect) return response.status(403).json('Wrong password.'); // 401 instead Invalid password/ Wrong credentials.
    // 'Invalid password'
    const { id: userId } = data;

    const accessToken = generateAccessToken(databaseUserId, databaseUsername, databaseRole);
    const refreshToken = generateRefreshToken(databaseUserId, databaseUsername, databaseRole);

    // OR saveRefreshToken
    updateRefreshToken(userId, refreshToken, (error, data) => {
      if (error !== null) return response.json(error);
      // console.log(data);
    });

    return response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // strict instead
      maxAge: dayInMilliseconds
    })
      .status(200)
      .json({ id: userId, username: databaseUsername, token: accessToken });
  });
};

export default signIn;
