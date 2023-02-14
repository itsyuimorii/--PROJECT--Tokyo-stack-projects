// Blog administration page routing
const express = require("express");

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
  //Receive request parameters (password and user name entered by the user)
  //res.send(req.body); //Receive request parameters from the client

  // Secondary verification of request parameters
  const { email, password } = req.body;
  //If the user does not enter an email address
  if (email.trim().length == 0 || password.trim().length == 0)
    //return res.status(400).send("<h4>Incorrect email address or password</h4>");
    return res
      .status(400)
      .render("admin/error", { msg: "Incorrect email address or password}" });
});

// Export the routing object as a member of the routing module
module.exports = admin;
