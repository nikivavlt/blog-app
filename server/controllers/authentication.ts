import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/token-generator.js';
import User from '../models/User.js';

const dayInMilliseconds = 24 * 60 * 60 * 1000;

// SINGLE TASK FOR FUNCTION
const signIn = (request, response) => {
  const { username: requestUsername, password: requestPassword } = request.body;

  User.getUserByName(requestUsername, (error, data) => {
    if (error !== null) return response.json(error);

    if (!data) return response.status(404).json('User not found.'); // 401 instead? User does not exist.

    const { id: databaseUserId, username: databaseUsername, password: databasePassword, role: databaseRole } = data;

    const isPasswordCorrect = bcrypt.compareSync(requestPassword, databasePassword);

    // isPasswordsEqual
    if (!isPasswordCorrect) return response.status(403).json('Wrong password.'); // 401 instead Invalid password/ Wrong credentials.

    const newObject = { ...data };

    const refreshToken = generateRefreshToken(databaseUserId, databaseUsername, databaseRole);

    newObject['refresh_token'] = refreshToken;

    // move this to Token service - saveRefreshToken
    new User(newObject).updateUser((error, data) => {
      if (error !== null) return response.json(error);
    });

    // also add to service and function to verifyToken
    const accessToken = generateAccessToken(databaseUserId, databaseUsername, databaseRole);
    return response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // strict instead
      maxAge: dayInMilliseconds
    })
      .status(200)
      .json({ username: databaseUsername, token: accessToken });
  });
};

export default signIn;
