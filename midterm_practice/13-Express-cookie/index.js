const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");

// const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const goodsRouter = require("./routes/goods");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// Make the route effective
// app.use("/user", userRouter);
// app.use("/goods", goodsRouter);

// Second method of registering routes
app.use("/students", require("./routes/student"));

//login routes
app.get("/", (req, res) => {
  res.render("login");
});

// app.get("/get-cookie", (req, res) => {
//   // 给客户端发送一个cookie
//   res.cookie("username", "admin");

//   res.send("cookie已经发送");
// });

// app.get("/hello", (req, res) => {
//   /*
//         需要安装中间件来使得express可以解析cookie
//             1.安装cookie-parser
//                 yarn add cookie-parser
//             2.引入
//                 const cookieParser = require("cookie-parser")
//             3.设置为中间件
//                 app.use(cookieParser())
//     */

//   // req.cookies 用来读取客户端发回的cookie
//   console.log(req.cookies);

//   res.send("hello路由");
// });

app.post("/login", (req, res) => {
  // Get the user's username and password
  const { username, password } = req.body;
  if (username === "admin" && password === "123123") {
    //res.send("Login successful");
    // 将用户名放入cookie
    //   res.cookie("username", username);
    res.redirect("/students/list");
  } else {
    res.send("Incorrect username or password");
  }
});

app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(3000, () => {
  console.log("server listening on http://localhost:3000");
});
