/* 路由处理函数模块 */

/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

////////////////////////
/* 这里需要✅四项任务:
1. 检测表单数据是否合法
2. 检测用户名是否被占用
3. 对密码进行加密处理
4. 插入新用户 */

//导入数据库操作模块
const db = require("../db/index");

exports.regUser = (req, res) => {
  //1. 接收表单数据
  const userinfo = req.body;
  console.log(userinfo);
  //2. 对表单中的数据,进行合法性校验
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: "用户名或密码不能为空！" });
  }
  res.send("regUser successfully registered");
};

exports.login = (req, res) => {
  res.send("login successfully registered");
};
