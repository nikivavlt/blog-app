import database from '../config/database.js';

const getRefreshToken = async (userId: string): Promise<any> => {
  const sql = 'SELECT `refresh_token` from users WHERE id = ? ';

  try {
    const databaseResponse = await database.query(sql, [userId]);
    return databaseResponse[0].refresh_token;
  } catch (error) {
    throw Error(error.message); // error handler
  }
};

const updateRefreshToken = (userId: string, refreshToken: string, callback): void => {
  const sql = 'UPDATE users SET `refresh_token` = ? WHERE id = ?';

  database.query(sql, [refreshToken, userId], (error, data) => {
    if (error !== null) return callback(error, null);

    return callback(null, data);
  });
};

const deleteRefreshToken = (userId: string, callback): void => {
  const sql = 'UPDATE users SET `refresh_token` = NULL WHERE id = ?';

  database.query(sql, userId, (error, data) => {
    if (error !== null) return callback(error, null);

    return callback(null, data);
  });
};

export {
  getRefreshToken,
  updateRefreshToken,
  deleteRefreshToken
};
