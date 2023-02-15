// Blog administration page routing
const express = require("express");
const bcrypt = require("bcrypt");
//導入用戶集合構造函數
const { User } = require("../model/user");

//create routes for blog administration
const admin = express.Router();

admin.get("/login", (req, res) => {
  res.render("admin/login");
});

// Create a user list route, this route will be based on the "Level 1 route" -admin "Level 2 route"
admin.get("/user", (req, res) => {
  res.render("admin/user");
});

//login routes
admin.post("/login", async (req, res) => {
  //Receive request parameters (password and user name entered by the user)
  //res.send(req.body); //Receive request parameters from the client

  // Secondary verification
  //receive the request parameters
  const { email, password } = req.body;
  //If the user does not enter an email address
  // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>Incorrect email address or password</h4>');
  if (email.trim().length == 0 || password.trim().length == 0)
    return res
      .status(400)
      .render("admin/error", { msg: "Incorrect email address or password" });
  //-------Search user information by email address-------
  // 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
  // 如果没有查询到用户 user变量为空
  let user = await User.findOne({ email });
  // 查询到了用户
  if (user) {
    // 将客户端传递过来的密码和用户信息中的密码进行比对
    // Search user information by email address
    // return boolean true or false
    let isValid = await bcrypt.compare(password, user.password);
    // If the password match is successful
    if (isValid) {
      // Login successful
      // Store the username in the request object
      req.username = user.username;
      res.send("Login successful");

      // Redirects to the user list page
      res.redirect("/admin/user");
    } else {
      // No users were queried
      res.status(400).render("admin/error", { msg: "Incorrect password" });
    }
  } else {
    // No user is queried
    res
      .status(400)
      .render("admin/error", { msg: "Incorrect email address or password???" });
  }
});

// Export the routing object as a member of the routing module
module.exports = admin;
