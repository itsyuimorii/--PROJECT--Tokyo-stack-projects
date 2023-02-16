// Blog administration page routing
const express = require("express");

const session = require("express-session");

//create routes for blog administration
const admin = express.Router();

// Render the login page
admin.get("/login", require("./admin/loginPage"));

// Realization of registration function
admin.post("/login", require("./admin/login"));

// Create a user list route
//this route will be based on the "Level 1 route" -admin "Level 2 route"
admin.get("/user", require("./admin/userList"));

//logout page
admin.get("/logout", require("./admin/logout"));

//edit page routes
admin.get("/user-edit", require("./admin/userEdit"));

//創建实现添加用户的功能路由(點擊submit後的post 操作)
admin.post("./userEdit", require("./admin/userEdit-fn"));

// Export the routing object as a member of the routing module
module.exports = admin;
