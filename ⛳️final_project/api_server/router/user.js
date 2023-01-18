/* router 文件夹 专门用来存放所有的路由模块
 * 路由模块中, 值存放可互关的请求和处理函数之间的映射关系
 */
//👇user.js 作为用户的路由模块, 并初始化代码如下👇

//导入express
const express = require("express");
//创建路由对象,用常量router 来接收
const router = express.Router();

/////////////////////////////////
/* 挂载两个路由,监听客户端的请求 */

//注册新用户
router.post("/regUser", (req, res) => {
  res.send("request successfully");
});

//登录
router.post("/login", (req, res) => {
  res.send("login successfully");
});

//暴露出去, 再app.js中导入并使用用户模块
module.exports = router;
