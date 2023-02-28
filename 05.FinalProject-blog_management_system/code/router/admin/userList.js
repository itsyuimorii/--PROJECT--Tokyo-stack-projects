//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // Add a logo: indicates that the currently visited page is a user management page
  // The locals method can be displayed in the template
  req.app.locals.currentLink = "user";

  //Pagination
  // 1. Receive the current page parameters from the client
  let page = req.query.page || 1;
  //2. Number of data items displayed per page
  let pagesize = 10;
  //3. Query the total number of user data
  let count = await User.countDocuments({});
  // res.send("The total number of users is: " + count);
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
