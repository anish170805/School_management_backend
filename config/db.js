import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool(`mysql://root:AigrVHvRkJxiBTHEbiDymbaroGsHecaG@caboose.proxy.rlwy.net:41548/railway`);

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
