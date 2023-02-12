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

// Find a document and delete it
// Returns the deleted document
// how to query the conditions match more than one document then the first matching document will be deleted
User.findOneAndDelete({ _id: "5c09f267aeb04b22f8460968" }).then((result) =>
  console.log(result)
);
// delete multiple documents
User.deleteMany({}).then((result) => console.log(result));
