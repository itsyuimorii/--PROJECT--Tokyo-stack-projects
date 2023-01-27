//////R
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/index");

//拿到客户端发过来的-表单数据
app.use(bodyParser.urlencoded({ extended: false }));

//拿到客户端发过来的-JSON数据
app.use(bodyParser.json());

//静态资源服务中间件(内置中间件)
app.use(express.static("./public"));

//用express 路由去替代中间件
app.use("/", router);

app.listen(8080, (req, res) => {
  console.log("localhost listening");
});
