const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  // The connection was successful
  .then(() => console.log("Database connection successful"))
  // connection failed
  .catch((err) => console.log(err, "database connection failed"));

// User collection rules
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
//Article Collection Rules
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
// Collection of users
const User = mongoose.model("User", userSchema);
// Article Collection
const Post = mongoose.model("Post", postSchema);

// Create User
// User.create（{name: 'yuki'}）.then（result => console.log(result)）。
// Create article
// Post.create({title: '123', author: '5c0caae2c4e4081c28439791'}).then(result => console.log(result))。
Post.find()
  .populate("author")
  .then((result) => console.log(result));
