const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs").promises;

const STUDENT_ARR = require("./data/students.json");

// Set ejs as the default template engine
app.set("view engine", "ejs");
//Configure the path to the template
app.set("views", path.resolve(__dirname, "views"));

// Configure static resource paths
app.use(express.static(path.resolve(__dirname, "views")));

// Processing request body parsing
app.use(express.urlencoded({ extended: true }));
// TODO: Implement a page that returns student information to the user when the user accesses the students route

app.get("/students", (req, res) => {
  res.render("students", { stuData: STUDENT_ARR });
});

app.get("/delete", (req, res) => {
  //获取要删除的学生的id
  const id = req.query.id;
  console.log(id);
});

// TODO:After users click add button, we need to submit the form to another route /addStudent

app.post("/addStudent", (req, res) => {
  // What are the steps in the routing:
  //1. get the information filled in by the user
  //1.2 Generate an id
  //2. Validate user information
  //3. Add user information to the array

  const id = STUDENT_ARR.at(-1).id + 1;
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

  // 4. Return Response
  //res.send("add success");
  // Rendering ejs directly in the add route will face the problem of duplicate form submissions
  //❌res.render("students", { stuData: STUDENT_ARR });

  //The redirect here avoids the problem of resubmitting the form to addStudents for the first time, and locating students after submission
  //res.redirect("/students");

  // Data persistence: Write new data to a json file
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENT_ARR)
  )
    .then(() => {
      // res.redirect() is used to initiate a request redirection
      // The purpose of the redirect is to tell the browser that you are making another request to another address
      res.redirect("/students");
    })
    .catch(() => {
      //.......
    });
});
//Configure error routes, need to be under all routes
app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
