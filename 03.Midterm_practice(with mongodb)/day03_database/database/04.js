const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err, "Database connection failed"));

// Create collection rules
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String],
});

// Create collections using rules
const User = mongoose.model("User", userSchema);

// Query all documents in the user collection
User.find().then((result) => console.log(result));
// Find documents by the _id field

User.find({ _id: "5c09f267aeb04b22f8460968" }).then((result) =>
  console.log(result)
);

// findOne method returns a document by default returns the first document in the current collection
User.findOne({ name: "BB" }).then((result) => console.log(result));
// Query the user collection for documents with an age field greater than 20 and less than 40
User.find({ age: { $gt: 20, $lt: 40 } }).then((result) => console.log(result));
//query the user collection in the hobbies field value contains soccer documents
User.find({ hobbies: { $in: ["BB"] } }).then((result) => console.log(result));
//Select the fields to be queried
User.find()
  .select("name email -_id")
  .then((result) => console.log(result));
// Ascending order by age field
User.find()
  .sort("age")
  .then((result) => console.log(result));
// Sort by age field in descending order
User.find()
  .sort("-age")
  .then((result) => console.log(result));
// Query document to skip the first two results Limit to 3 results
User.find()
  .skip(2)
  .limit(3)
  .then((result) => console.log(result));
