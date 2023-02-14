// Blog administration page routing
const express = require("express");

//create routes for blog administration
const admin = express.Router();

admin.get("/login", (req, res) => {
  res.render("admin/login");
});

// Export the routing object as a member of the routing module
module.exports = admin;
