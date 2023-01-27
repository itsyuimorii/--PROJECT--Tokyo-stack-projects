const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/index");
//用express 路由去替代中间件
app.use("/", router);

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8080, (req, res) => {
  console.log("localhost listening");
});
