//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  //1. 接收客戶端傳遞過來的當前頁參數
  let page = req.query.page;
  //2. 每一頁顯示的數據條數
  let pagesize = 10;
  //查詢用戶數據的總數
  let count = await User.countDocuments({});
  res.send("");
  // Query the user information from the database
  let users = await User.find({});

  //res.send(users);
  //渲染用戶列表模板, 將接收到的結果users傳入模板中, users是數組
  res.render("admin/user", {
    users: users,
  });
};
