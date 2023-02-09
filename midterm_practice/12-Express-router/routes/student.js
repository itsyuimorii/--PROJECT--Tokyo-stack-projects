const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

let STUDENT_ARR = require("../data/students.json");

//学生列表的路由
router.get("/list", (req, res) => {
  res.render("students", { stuData: STUDENT_ARR });
});

//添加学生的路由
router.post("/add", (req, res, next) => {
  const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1;
  // const newUser = req.body;
  const newUser = {
    id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    country: req.body.country,
  };
  //console.log(newUser);
  //2. Validate user information(skip)

  //3. Add user information to the array
  STUDENT_ARR.push(newUser);

  // 4. 调用next(),交由后续路由继续处理
  next();
});

// Middleware for extracting and processing stored files
router.use((req, res) => {
  fs.writeFile(
    path.resolve(__dirname, "../data/students.json"),
    JSON.stringify(STUDENT_ARR)
  )
    .then(() => {
      res.redirect("/students/list");
    })
    .catch(() => {
      res.send("操作失败！");
    });
});

//删除学生的路由
module.exports = router;
