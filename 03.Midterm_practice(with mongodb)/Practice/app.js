const http = require("http");

const app = http.createServer();

const mongoose = require("mongoose");

//Adding request events to server objects
app.on("request", (req, res) => {
  res.end("ok");
});

app.listen(3000);
