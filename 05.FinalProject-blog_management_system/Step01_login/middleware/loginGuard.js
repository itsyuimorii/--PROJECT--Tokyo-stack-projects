const guard = (req, res, next) => {
  /* 
1. Determining whether the user is visiting a login page
2. Determine the user's login status
   1. If the user is logged in, the request is released
   2. If the user is not logged in, redirect the request to the login page */

  if (req.url != "/login" && !req.session.username) {
    res.redirect("/admin/login");
  } else {
    // User is logged in Release the request
    next();
  }
};
module.exports = guard;
