// Blog administration page routing
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
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
  // If the user is queried, the value of the user variable is an object type, and the object stores the user's information.
  // If the user is not queried, the user variable is empty.
  let user = await User.findOne({ email });
  // The user is queried
  if (user) {
    // Match the password passed by the client with the password in the user information // Search user information by email address
    // true The comparison is successful
    // false Failed to match
    let isValid = await bcrypt.compare(password, user.password);
    // if the password match is successful
    if (isValid) {
      // login was successful
      // Store the username in the request object
      req.session.username = user.username;
      //res.send("Login successful");
      req.app.locals.userInfo = user;
      // redirect to user list page
      res.redirect("/admin/user");
    } else {
      // No users were queried
      res
        .status(400)
        .render("admin/error", { msg: "Incorrect email address or password" });
    }
  } else {
    // No user is queried
    res
      .status(400)
      .render("admin/error", { msg: "Incorrect email address or password" });
  }
});

// Export the routing object as a member of the routing module
module.exports = admin;
