const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground"),
  { userNewUrlParser: true }
    .then(() => console.log("database connection established"))
    .catch(() => console.log("database connection failed"));
