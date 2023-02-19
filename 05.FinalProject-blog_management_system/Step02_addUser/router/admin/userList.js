//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  //接收客戶端傳遞過來的當前頁參數
  let page = req.query.page;

  // Query the user information from the database
  //users 接受返回的結果
  let users = await User.find({});

  //res.send(users);
  //渲染用戶列表模板, 將接收到的結果users傳入模板中, users是數組
  res.render("admin/user", {
    users: users,
  });
};
