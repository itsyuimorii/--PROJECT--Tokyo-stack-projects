//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  //Pagination
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

  let start = (page - 1) * pagesize;
  // Query the user information from the database
  let users = await User.find({}).limit(pagesize).skip(start);

  //res.send(users);
  //Render the user list template, and pass the received result users into the template, users is an array
  res.render("admin/user", {
    users: users,
    page: page,
    total: total,
  });
};
