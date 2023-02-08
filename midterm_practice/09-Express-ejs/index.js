const express = require("express");
const app = express();
const path = require("path");

const STUDENT_ARR = [
  {
    name: "AAAAA",
    age: 18,
    gender: "male",
    address: "D33 2F0",
  },
  {
    name: "BBBBB",
    age: 28,
    gender: "male",
    address: "AAA 333",
  },
  {
    name: "CCCCC",
    age: 38,
    gender: "v",
    address: "C22 FEE",
  },
];

let name = "BBBBB";

// Set ejs as the default template engine
app.set("view engine", "ejs");

// Configure static resource paths
app.use(express.static(path.resolve(__dirname, "views")));

// Processing request body parsing
app.use(express.urlencoded({ extended: true }));
// TODO: Implement a page that returns student information to the user when the user accesses the students route
app.get("/students", (req, res) => {
  res.render("students", { name: "AAAAA", age: 18 });
});

//Configure error routes, need to be under all routes
app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
