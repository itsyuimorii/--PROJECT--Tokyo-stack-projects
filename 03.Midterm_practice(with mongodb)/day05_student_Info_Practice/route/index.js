// Introduce the router module
const getRouter = require("router");
// Get the routing object
const router = getRouter();
// Student Information Collection
const Student = require("../model/user");
// Introduction of the template engine
const template = require("art-template");
// Introduce the querystring module
const querystring = require("querystring");

//Submit Student Profile Information Page
router.get("/add", (req, res) => {
  let html = template("index.art", {});
  res.end(html);
});

// List page for submitting student record information
router.get("/list", async (req, res) => {
  // Check student information
  let students = await Student.find();
  console.log(students);
  let html = template("list.art", {
    students: students,
  });
  res.end(html);
});
// Implement the student information addition function routing
router.post("/add", (req, res) => {
  // Receive post request parameters
  let formData = "";
  req.on("data", (param) => {
    formData += param;
  });
  req.on("end", async () => {
    await Student.create(querystring.parse(formData));
    res.writeHead(301, {
      Location: "/list",
    });
    res.end();
  });
});

module.exports = router;
