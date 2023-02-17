// 引入用户集合的构造函数
const { User } = require("../../model/user"); // 引入加密模块

module.exports = (req, res) => {
  const { message } = req.query;
  res.render("admin/userEdit", {
    message: message,
  });
};
