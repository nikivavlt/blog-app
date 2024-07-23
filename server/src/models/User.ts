import { database } from '../config/database.js';

class User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  image: string;
  refresh_token: string;
      // created_at: Date;

  constructor (user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.image = user.image;
    this.refresh_token = user.refresh_token;
  }

  // updateUser = (callback) => {
  //   const query = 'UPDATE users SET `id` = ?, `username` = ?, `email` = ?, `password` = ?, `role` = ?, `image` = ?, `refresh_token` = ? WHERE username = ?';
  //   const { updateUser, ...data } = this;

  //   // for (let v in this) {
  //   //     
  // (typeof this[v] === 'function')
  //   // }
  //   database.query(query, [...Object.values(data), this.username], (error, data) => {
  //     if (error !== null) callback(error, null);
  //     callback(null, data);
  //   });
  // };

  // REMOVE * FROM QUERY!!!
  static getUserByName = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';

    database.query(query, [username], (error, data) => {
      if (error !== null) callback(error, null);
      callback(null, data[0]);
    });
  };

  // findUserByUsername and findUserByEmail
};

export default User;
