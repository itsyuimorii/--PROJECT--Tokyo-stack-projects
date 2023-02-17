const Joi = require("joi");

module.exports = (req, res) => {
  //這裡實現用戶添加功能
  // res.send("ok");
  res.send(req.body);
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //定義對象的驗證規則
  const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("Invalid username")),
  };
};
