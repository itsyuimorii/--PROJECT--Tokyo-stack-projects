// 引入用户集合的构造函数
const { User } = require("../../model/user"); // 引入加密模块

module.exports = async (req, res) => {
  const { message } = req.query;
  // 添加操作
  res.render("admin/userEdit", {
    message: message,
  });
};
