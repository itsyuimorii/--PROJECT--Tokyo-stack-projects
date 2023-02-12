const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })

  .then(() => console.log("Database connection successful"))

  .catch((err) => console.log(err, "database connection failed"));

// Create collection rules
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
});

// Create collections using rules
// 1. Collection name
// 2. Collection rules
const Course = mongoose.model("Course", courseSchema); // courses

// Create a document
const course = new Course({
  name: "node.js basic",
  author: "hekuro",
  isPublished: true,
});
// Insert the document into the database
course.save();
