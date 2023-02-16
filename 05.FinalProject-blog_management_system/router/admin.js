// Blog administration page routing
const express = require("express");

const session = require("express-session");

//create routes for blog administration
const admin = express.Router();

//渲染登錄頁面
admin.get("/login", require("./admin/loginPage"));

// Create a user list route, this route will be based on the "Level 1 route" -admin "Level 2 route"
admin.get("/user", (req, res) => {
  res.render("admin/user");
});

//login routes
admin.post("/login", require("./admin/login"));

// Export the routing object as a member of the routing module
module.exports = admin;
