//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // 1. Receive the current page parameters from the client
  let page = req.query.page;
  //2. Number of data items displayed per page
  let pagesize = 10;
  //3. Query the total number of user data
  let count = await User.countDocuments({});
  // res.send("用戶的總數是: " + count);
  // return;
  //4. Total number of pages
  let total = Math.ceil(count / pagesize);

  // Query the user information from the database
  let users = await User.find({});

  //res.send(users);
  //渲染用戶列表模板, 將接收到的結果users傳入模板中, users是數組
  res.render("admin/user", {
    users: users,
  });
};
