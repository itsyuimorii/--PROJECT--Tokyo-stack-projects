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

// Export the routing object as a member of the routing module
module.exports = admin;
