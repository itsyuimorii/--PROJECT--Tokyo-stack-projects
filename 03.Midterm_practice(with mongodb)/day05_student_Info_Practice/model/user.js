// Set collection rules
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", studentSchema);
// Export the student information collection
module.exports = Student;
