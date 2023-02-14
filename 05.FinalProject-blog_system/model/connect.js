const mongoose = require("mongoose");
// Connecting to the database
mongoose
  .connect("mongodb://localhost/blog", { useNewUrlParser: true })
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failure"));
