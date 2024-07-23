import databaseQuery from 'src/config/database-query.js';

const findByUsername = async (username: string) => {
  const sql = 'SELECT * FROM users WHERE username = ?';

  try {
    const data = await databaseQuery(sql, [username]);
    return data[0];
  } catch (error) {
    throw Error(error);
  }
};

const findByEmail = async (email: string) => {
  const sql = 'SELECT * FROM users WHERE email = ?';

  try {
    const data = await databaseQuery(sql, [email]);
    return data[0];
  } catch (error) {
    throw Error(error);
  }
};

export {
  findByUsername,
  findByEmail
};
