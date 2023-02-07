const express = require("express");
const path = require("path");

// 创建服务器的实例
const app = express();

// Create an array to store user information
const USERS = [
  {
    username: "admin",
    password: "000000",
    nickname: "admin",
  },
  {
    username: "admin2",
    password: "123456",
    nickname: "admin2",
  },
  w,
];

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded());

app.post("/login"),
  (req, res) => {
    //Get the username and password entered by the user
    const username = req.body.username;
    const password = req.body.password;

    const loginUser = USERS.find((item) => {
      return item.username === username && item.password === password;
    });

    if (loginUser) {
      res.send("<h1>Login successful！</h1>");
      console.log("successful");
    } else {
      res.send("<h1>Wrong username or password!</h1>");
    }
  };

app.listen(3000, () => {
  console.log("App is listening on port http://localhost:3000 ");
});
