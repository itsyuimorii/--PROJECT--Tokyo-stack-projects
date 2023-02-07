const express = require("express");
const path = require("path");

// 创建服务器的实例
const app = express();

// Static Middleware
// After setting the static middleware, the browser will automatically go to the public directory to find out if there are any matching static resources when it visits

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/home", function (req, res, next) {
  res.send(200);
});

//ejs file has to be created under views folder
app.get("/", function (req, res, next) {
  res.render("home.ejs");
});
app.listen(3000, () => {
  console.log("App is listening on port http://localhost:3000 ");
});
