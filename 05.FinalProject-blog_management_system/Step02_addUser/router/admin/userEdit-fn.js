const Joi = require("joi");

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
  //res.send(req.body);
};
