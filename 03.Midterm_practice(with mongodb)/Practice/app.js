const http = require("http");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground"),
  { userNewUrlParser: true }
    .then(() => console.log("database connection established"))
    .catch(() => console.log("database connection failed"));

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

//create server
const app = http.createServer();
//Adding request events to server objects
app.on("request", (req, res) => {
  res.end("ok");
});

app.listen(3000);
