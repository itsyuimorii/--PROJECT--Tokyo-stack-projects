// 引入用户集合的构造函数
const { User, validateUser } = require("../../model/user");
// 引入加密模块
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  //這裡實現用戶添加功能
  // res.send("ok");
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    //实施验证
    await validateUser(req.body);
  } catch (e) {
    //验证没有通过
    //e.message
    //重定向回用户添加页面
    return res.redirect(`/admin/userEdit?message=${e.message}`);
  }

  // 根据邮箱地址查询用户是否存在
  let user = await User.findOne({ email: req.body.email });
  // 如果用户已经存在 邮箱地址已经被别人占用
  if (user) {
    // 重定向回用户添加页面
    return res.redirect(`/admin/userEdit?message=邮箱地址已经被占用`);
    //return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
  }
  res.send(user);
};
