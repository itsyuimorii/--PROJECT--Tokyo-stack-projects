// Introduce the mongoose third-party module to manipulate the database
const mongoose = require("mongoose");
// Database connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  // Connection successful
  .then(() => console.log("Database connection successful"))
  // Connection failure
  .catch((err) => console.log(err, "database connection failed"));
