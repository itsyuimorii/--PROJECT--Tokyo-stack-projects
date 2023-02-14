const express = require("express");
const path = require("path");
//create web server instance
const app = express();

//import routes from router file
const homeRouter = require("./router/home");
const adminRouter = require("./router/admin");

//Open Static Source File
app.use(express.static(path.join(__dirname, "public")));

//import routing module
//Match the first level request path to the routing object,
app.use("/home", homeRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("api server running at http://127.0.0.1:3000");
});
