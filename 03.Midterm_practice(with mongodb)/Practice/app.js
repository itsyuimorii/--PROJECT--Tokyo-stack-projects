const http = require("http");
const mongoose = require("mongoose");
const url = require("url");

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
  //請求方式
  req.method = req.method;
  //request method
  const { pathname } = url.parse(req.url);
  if (method === "GET") {
    if((pathname == "/list")
  } else if (method === "POST") {
  }
  res.end("ok");
});

app.listen(3000);
