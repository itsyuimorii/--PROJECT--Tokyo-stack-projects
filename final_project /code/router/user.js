/* TODO: router文件夹中过专门用来存放所有的路由模块.路由模块中,
  值存放可互关的请求和处理函数之间的映射关系; */

//👇user.js 作为用户的路由模块, 并初始化代码如下👇

//导入express
const express = require("express");
//创建路由对象,用常量router 来接收
const router = express.Router();

//导入用户路由处理函数对应的模块
const user_handler = require("../router_handler/user");

///////////////////导入验证
//1. 导入验证表单数据的中间件 ,将中间件在对应的路由中进行调用 router.post
const expressJoi = require("@escook/express-joi");
//2. 导入需要验证的规则对象 (解构赋值)
const { reg_login_schema } = require("../schema/user");

////////////////////////挂载两个路由,监听客户端的请求
// 3.  在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理

//注册新用户
//用中间件(expressJoi(reg_login_schema))进行验证, 如通过,那么进行user_handler.regUser处理函数, 如果没有, 就捕获错误, 在app.js中设置
router.post("/reguser", expressJoi(reg_login_schema), user_handler.regUser);
//登录
router.post("/login", expressJoi(reg_login_schema), user_handler.login);

//暴露出去, 再app.js中导入并使用用户模块
module.exports = router;
