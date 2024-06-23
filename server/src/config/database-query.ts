import mysql from 'mysql2/promise';
import type { OkPacket, RowDataPacket, ResultSetHeader, ProcedureCallPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

type IQuery = (sql: string, values?: string[] | []) => Promise<OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket>;

const databaseQuery: IQuery = async (sql, values = []) => {
  const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  try {
    const [results] = await pool.execute(sql, values);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error('An unknown error occurred.');
    }
  }
};

export default databaseQuery;
