const mongoose = require("mongoose");
// Database connection 27017 is the default port for mongodb database
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failure"));
