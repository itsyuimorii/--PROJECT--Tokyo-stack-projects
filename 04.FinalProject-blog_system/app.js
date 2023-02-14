const express = require("express");
const app = express();

//import routes from router file
const homeRouter = require("./router/home");
const adminRouter = require("./router/admin");

//為路由對象匹配一級請求路徑,
app.use("/home", homeRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("api server running at http://127.0.0.1:3000");
});
