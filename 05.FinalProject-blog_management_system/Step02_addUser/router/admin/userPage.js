const { User } = require("../../model/user");
module.exports = (req, res) => {
  // Query the user information from the database
  res.render("admin/user");
};
