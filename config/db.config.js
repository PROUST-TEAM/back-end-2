const mysql = require('mysql2/promise');
const pool= mysql.createPool({
  host:'localhost',
  user:'root',
  database:'proust_db',
  password:'1234',
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
});
module.exports= pool;

