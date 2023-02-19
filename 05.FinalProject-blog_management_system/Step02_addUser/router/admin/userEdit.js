// 引入用户集合的构造函数
const { User } = require("../../model/user"); // 引入加密模块

module.exports = async (req, res) => {
  //獲取到地址欄中的id參數

  const { message, id } = req.query;
  // 添加操作
  res.render("admin/userEdit", {
    message: message,
  });

  //如果當前傳遞了id參數,
  if (id) {
    //修改操作
  } else {
    //添加操作
  }
};
