const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("this is hello router");
});

app.listen(3000, (error) => {
  console.log(
    "Server is Successfully Running,and App is listening on port http://localhost:3000"
  );
});
