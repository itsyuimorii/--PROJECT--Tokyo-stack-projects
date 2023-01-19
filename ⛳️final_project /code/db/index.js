//导入mysql 模块
const mysql = require("mysql");

// 2. 建立与 MySQL 数据库的连接关系~
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "yuimorii", // 登录数据库的密码
  database: "blog_db_2023", // 指定要操作哪个数据库
});

// 向外共享 db 数据库连接对象
module.exports = db;
