const Joi = require("joi");

module.exports = async (req, res) => {
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
  };
  try {
    // Validation passed
    await Joi.validate(req.body, schema);
  } catch (error) {
    //Certification not passed
  }
};
