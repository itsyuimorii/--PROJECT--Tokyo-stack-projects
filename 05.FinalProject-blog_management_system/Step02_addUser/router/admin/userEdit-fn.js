const Joi = require("joi");
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //這裡實現用戶添加功能
  // res.send("ok");
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //定義對象的驗證規則

  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("Invalid username")),
    email: Joi.string().email().required().error(new Error("Invalid email")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("Invalid password")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("Invalid Value")),
    state: Joi.number()
      .valid(0, 1)
      .required()
      .error(new Error("Invalid status")),
  });

  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    //实施验证
    await schema.validateAsync(req.body);
  } catch (e) {
    //验证没有通过
    //e.message
    //重定向回用户添加页面
    res.redirect(`/admin/userEdit?${e.message}`);
  }

  // 引入用户集合的构造函数
  const { User, validateUser } = require("../../model/user");
  // 引入加密模块
  const bcrypt = require("bcrypt");

  module.exports = async (req, res, next) => {
    try {
      await validateUser(req.body);
    } catch (e) {
      // 验证没有通过
      // e.message
      // 重定向回用户添加页面
      // return res.redirect(`/admin/user-edit?message=${e.message}`);
      // JSON.stringify() 将对象数据类型转换为字符串数据类型
      return next(
        JSON.stringify({ path: "/admin/user-edit", message: e.message })
      );
    }

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    // 如果用户已经存在 邮箱地址已经被别人占用
    if (user) {
      // 重定向回用户添加页面
      // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
      return next(
        JSON.stringify({
          path: "/admin/user-edit",
          message: "邮箱地址已经被占用",
        })
      );
    }
    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect("/admin/user");
  };
  //res.send(req.body);
  //根據郵箱地址查詢用戶是否存在
};
