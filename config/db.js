import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  let connection;
  try {
    connection = await pool.promise().getConnection();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
})();

export default pool.promise();