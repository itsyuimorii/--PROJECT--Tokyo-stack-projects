const express = require("express");
const app = express();
const path = require("path");

const STUDENT_ARR = [
  {
    id: "1",
    name: "AAAAA",
    age: 18,
    gender: "male",
    country: "🇯🇵",
  },
  {
    id: "2",
    name: "BBBBB",
    age: 28,
    gender: "male",
    country: "🇺🇸",
  },
  {
    id: "3",
    name: "CCCCC",
    age: 38,
    gender: "v",
    country: "🇨🇦",
  },
];

// Set ejs as the default template engine
app.set("view engine", "ejs");
//配置模版的路径
app.set("views", path.resolve(__dirname, "views"));

// Configure static resource paths
app.use(express.static(path.resolve(__dirname, "views")));

// Processing request body parsing
app.use(express.urlencoded({ extended: true }));
// TODO: Implement a page that returns student information to the user when the user accesses the students route

app.get("/students", (req, res) => {
  res.render("students", { stuData: STUDENT_ARR });
});

//点提交button后, 我们需要将表单提交给另一个路由
app.post("/add-student", (req, res) => {
  //路由里步骤是什么:
  //1. 获取用户填写的信息
  //1.2生成一个id
  const id = STUDENT_ARR.at(-1).id + 1;
  // const newUser = req.body;
  const newUser = {
    id: req.params.id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    country: req.body.country,
  };
  console.log(newUser);
  //2. 验证用户信息
  //3. 将用户信息添加到数组中
});

//Configure error routes, need to be under all routes
app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
