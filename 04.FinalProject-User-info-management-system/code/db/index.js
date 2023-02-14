//导入mysql 模块
const mysql = require("mysql");

// 2. Create a connection to the MySQL database ~
const db = mysql.createPool({
  host: "127.0.0.1", // the IP address of the database
  user: "root", // account to log in to the database
  password: "123456", // password to log in to the database
  database: "blog_db_2023", // Specify which database to operate
});

// Share the db database connection object to the outside
module.exports = db;
