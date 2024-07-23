import databaseQuery from '../config/database.js';
import bcrypt from 'bcryptjs';
import type { Request, Response, NextFunction } from 'express';

// destructure of request data inside controller and pass to service
// SPLIT CONTROLLER signInController/ signUpController
// Authentication - user signIn, authorization - role access

const signUp = (request: Request, response: Response, next: NextFunction): void => {
  //   Check if user exists in database
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
  // const one = await findUserByUsername(user.username);
  // const two = await findUserByEmail(user.email); 
  // USE THIS instead!

  database.query(query, [request.body.email, request.body.username], (error, data) => {
    // check if it has all necessary fields (password, username ...) - return 400
    if (error) return response.json(error);

    if (data.length) return response.status(409).json('User already exists.');

    const {
      username,
      password, 
      email
      // ....
    } = request.body;

    if (
      !username || 
      !password || 
      !email || 
      username === '' ||
      password === '' || 
      email === '') {
      return response.status(400).json('All fields are required'); // next (errorHandler)
    }

    // Hash the password and create user CREATE SERVICE
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(request.body.password, salt); // change request.body to destructured object and name
    // passwordHash or hashedPassword

    // add refresh token inside database
    // add role
    // add is_admin boolean value or roles
    // USE DATA FROM DESCTUCTURED OBJECT
    const query = 'INSERT INTO users(`username`, `email`, `password`) VALUES (?)';
    const values = [
      request.body.username,
      request.body.email,
      hashedPassword
    ];

    // rewrite it using try ... catch
    database.query(query, [values], (error, data) => {
      if (error) return response.json(error);
      // next error

      return response.status(200).json('User has been created.'); // 'User created succesfful', send username
    });
  });
};

const signOut = (request: Request, response: Response): void => {
  // DONT PASS userdata on client just verify jwt in headers and check refresh token
  // secure - server for https only
  // delete refreshToken in db found user by refresh token
  // check if it has refresh token or not and send 204
  response.clearCookie('refresh_token', {
    // DELETE TOKEN IN DATABASE
    sameSite: 'none', // strict
    secure: true
  }).status(200).json('User has been sign out'); // sameSite 'none'
  // 204 instead
};

export { signUp, signOut };
