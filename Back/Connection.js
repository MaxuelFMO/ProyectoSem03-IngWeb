require('dotenv').config();

const mysql = require('mysql2/promise');

const connectionConfig = {
  host: process.env.SERVERNAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  port: parseInt(process.env.PORT)
};

async function connectDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Conectado a la base de datos ventas_db');
    return connection;
  } catch (err) {
    console.error('Error al conectar:', err);
    throw err;
  }
}

module.exports = { connectDB };
