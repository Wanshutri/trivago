const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  //host: 'localhost', USAR SOLO PARA DESARROLLAR, NO USAR EN PRODUCCION (DOCKER)
  host: 'mysql',
  port: 3306,
  user: 'trivago_user',
  password: 'trivago_pass',
  database: 'hotel_trivago',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;