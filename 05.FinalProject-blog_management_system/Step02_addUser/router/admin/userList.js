//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // Query the user information from the database
  //users 接受返回的結果
  let users = await User.find({});
  //渲染頁面模板, 將接收到的結果users傳入模板中, users是數組
  res.send(users);
  //   res.render("admin/user", {
  //     users: users,
  //   });
};
