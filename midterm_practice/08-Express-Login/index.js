const express = require("express");
const app = express();
const path = require("path");

// 创建一个数组来存储用户信息
const USERS = [
  {
    username: "admin",
    password: "123123",
    nickname: "admin",
  },
  {
    username: "admin2",
    password: "123123",
    nickname: "admin2",
  },
];

// Configuring the path to static resources
// public http://localhost:3000/
app.use(express.static(path.resolve(__dirname, "public")));
// Introduction of middleware for parsing request bodies
app.use(express.urlencoded());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginUser = USERS.find((item) => {
    return item.username === username && item.password === password;
  });

  if (loginUser) {
    res.send(`<h1>Login successful ${loginUser.nickname}</h1>`);
  } else {
    res.send(`<h1>Incorrect username or password</h1>`);
  }
});

app.post("/register", (req, res) => {
  // Get the data entered by the user
  // console.log(req.body)
  const { username, password, repwd, nickname } = req.body;

  // console.log(username, password, repwd, nickname)
  // 验证这些数据是否正确，略...
  // 只验证用户名是否存在
  const user = USERS.find((item) => {
    return item.username === username || item.nickname === nickname;
  });

  // console.log(user)
  if (!user) {
    // Enter the judgment that the user does not exist and can register
    USERS.push({
      username,
      password,
      nickname,
    });

    res.send("<h1>Congratulations! Registration was successful!</h1>");
  } else {
    res.send("<h1>Username already exists!</h1>");
  }
});

app.listen(3000, () => {
  console.log("Server is up~");
});
