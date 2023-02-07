const express = require("express");
const path = require("path");

// 创建服务器的实例
const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.get("/login"),
  (req, res) => {
    //Get the username and password entered by the user
    if (req.query.username === "admin" && req.query.password === "123456") {
      res.send("<h1>Login successful！</h1>");
    } else {
      res.send("<h1>Wrong username or password!</h1>");
    }
  };
app.get("/hello,(req, res) => {
});
app.listen(3000, () => {
  console.log("App is listening on port http://localhost:3000 ");
});
