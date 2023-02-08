const express = require("express");
const app = express();
const path = require("path");

// Configure static resource paths
app.use(express.static(path.resolve(__dirname, "public")));

// Processing request body parsing
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("hello");
});

//Configure error routes, need to be under all routes
app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
