// 导入 express
const express = require("express");
// 创建路由对象
const router = express.Router();

//导入路由处理函数模块
const userinfo_handler = require("../router_handler/userinfo");

///////////////////验证数据合法性的中间件
//1. 导入验证表单数据的中间件 ,将中间件在对应的路由中进行调用 router.post
const expressJoi = require("@escook/express-joi");

//2. 导入需要验证的规则对象 (解构赋值)
const {
  update_userinfo_schema,
  update_password_schema,
} = require("../schema/user");

//获取用户信息的路由
router.get("/userinfo", userinfo_handler.getUserInfo);

// 更新用户信息的路由
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfo_handler.updateUserInfo
);
// 更新密码的路由
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
);
/* 
// 更换头像的路由
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar
);
 */
// 向外共享路由对象
module.exports = router;
