//初始化路由模块
//导入express
const express = require("express");

//创建路由对象, 通过调用router
const router = express.Router();

//获取用户基本信息,挂载路由
router.get("/userinfo", (req, res) => {
  res.send("userinfo check");
});

//向外分享路由对象
module.exports = router;
