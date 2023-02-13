const mongoose = require("mongoose");

// Create collection rules
const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: "number",
    min: 18,
    max: 80,
  },
  password: String,
  email: String,
  hobbies: [String],
});
//create collection, return collection construct function
const User = mongoose.model("User", userSchema);

const Student = mongoose.model("Student", studentsSchema);
// Export the student information collection
module.exports = Student;
