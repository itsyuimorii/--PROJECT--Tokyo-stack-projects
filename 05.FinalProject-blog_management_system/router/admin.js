// Blog administration page routing
const express = require("express");
const bodyParser = require("body-parser");

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
admin.post("/login", (req, res) => {
  //接收請求參數(用戶輸入的密碼和用戶名)

  res.render("user");
});
// Export the routing object as a member of the routing module
module.exports = admin;
