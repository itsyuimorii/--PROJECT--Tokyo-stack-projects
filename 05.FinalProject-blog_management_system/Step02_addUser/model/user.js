const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//set collection rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  //admin or normal user
  role: {
    type: String,
    required: true,
  },
  //0 is enabled, 1 is disabled
  state: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

/*-----testing code here------*/
//set collection
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("000000", salt);
  const user = await User.create({
    username: "admin",
    email: "admin@example.com",
    password: pass,
    role: "admin",
    state: 0,
  });
}
// createUser();
/* User.create({
  username: "admin",
  email: "admin2@example.com",
  password: "000000",
  role: "admin",
  state: 0,
})
  .then(() => {
    console.log("user created successfully");
  })
  .catch(() => {
    console.log("error creating user");
  }); */

// 验证用户信息
const validateUser = (user) => {
  // 定义对象的验证规则
  const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式不符合要求")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码格式不符合要求")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("角色值非法")),
    state: Joi.number().valid(0, 1).required().error(new Error("状态值非法")),
  };

  // 实施验证
  return Joi.validate(user, schema);
};

// 将用户集合做为模块成员进行导出
module.exports = {
  User,
  validateUser,
};
