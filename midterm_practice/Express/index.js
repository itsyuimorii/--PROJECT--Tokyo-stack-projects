const express = require("express");

//Get an instance (object) of the server
const app = express();

app.listen(8080, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + 8080
    );
  else console.log("Error occurred, server can't start", error);
});
