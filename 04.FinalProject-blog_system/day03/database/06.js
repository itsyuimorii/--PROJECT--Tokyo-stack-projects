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

// find the document to be deleted and delete
// return whether the object is deleted successfully
// If you match more than one document, only the first successful document will be deleted
// User.updateOne({name: 'BB'}, {age: 120, name: 'BB'}).then(result => console.log(result))
// find the document to be deleted and delete
User.updateMany({}, { age: 300 }).then((result) => console.log(result));
