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

  // 4. call next(), leave it to subsequent routes to continue processing
  next();
});
//Delete the student's route
router.get("/delete", (req, res, next) => {
  const id = +req.query.id;
  console.log(id);

  STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id);

  next();
});

//Routing of /Update Student Information
router.post("/update-student", (req, res, next) => {
  const { id, name, age, gender, address } = req.body;
  const student = STUDENT_ARR.find((item) => item.id == id);

  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.address = address;
  next();
});

router.get("/to-update", (req, res) => {
  const id = +req.query.id;
  const student = STUDENT_ARR.find((item) => item.id === id);

  res.render("update", { student });
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
      res.send("error");
    });
});

module.exports = router;
