// Blog administration page routing
const express = require("express");

//create routes for blog administration
const admin = express.Router();

admin.get("/login", (req, res) => {
  res.render("admin/login");
});

//創建用戶列表路由,這個路由會是基於“一級路由”-admin的“二級路由”
admin.get("/user", (req, res) => {
  res.render("admin/user");
});
// Export the routing object as a member of the routing module
module.exports = admin;
