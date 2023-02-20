// reference express framework
const express = require("express");
// handle paths
const path = require("path");
// introduce the body-parser module to handle post request parameters
const bodyParser = require("body-parser");
// Import the express-session module
const session = require("express-session");

// Create the web server
const app = express();
// Database connection
require("./model/connect");

//Configure the post request parameter, body-parser parsing file
app.use(bodyParser.urlencoded({ extended: false }));

// Configure session
app.use(
  session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
  })
);

// Tell the express framework where the template is located
app.set("views", path.join(__dirname, "views"));
// Tell the express framework template what the default suffix is
app.set("view engine", "art");
// What template engine is used when rendering templates with the art suffix
app.engine("art", require("express-art-template"));

//Open Static Source File
app.use(express.static(path.join(__dirname, "public")));

//import routes from router file
const homeRouter = require("./router/home");
const adminRouter = require("./router/admin");
const { read } = require("fs");

// Intercept requests to determine user login status
app.use("/admin", require("./middleware/loginGuard"));

//import routing module
//Match the first level request path to the routing object,
app.use("/admin", adminRouter);

/* //錯誤處理中間件
app.use((err, req, res, next) => {
  // res.redirect(`/admin/userEdit?message=${e.message}`);
  const result = JSON.parse(err);
  res.redirect(`${result.path}?message=${result.message}`);
}); */

//錯誤處理中間件
app.use((err, req, res, next) => {
  // res.redirect(`/admin/userEdit?message=${e.message}`);
  const result = JSON.parse(err);
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
      message = result[attr];
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});

app.listen(3000, () => {
  console.log("api server running at http://127.0.0.1:3000");
});
