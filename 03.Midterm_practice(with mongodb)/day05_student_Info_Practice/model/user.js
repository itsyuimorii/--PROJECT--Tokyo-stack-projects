// Set collection rules
const mongoose = require("mongoose");

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
  sex: {
    type: "String",
  },
  email: String,
  hobbies: [String],
  college: String,
  entryDate: {
    type: Date,
    default: Date.now,
  },
});

//create collection, return collection construct function
const studentsSchema = mongoose.model("User", userSchema);

const Student = mongoose.model("Student", studentsSchema);
// Export the student information collection
module.exports = Student;
