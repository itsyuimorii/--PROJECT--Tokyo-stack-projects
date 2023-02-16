// 引用expess框架
const express = require("express");
// 处理路径
const path = require("path");
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require("body-parser");
// 导入express-session模块
const session = require("express-session");
//create web server instance
const app = express();

//database connection
require("./model/connect");

//Create initial user
require("./model/user");

// 配置session
app.use(
  session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
  })
);

//Configure the post request parameter, body-parser parsing file
app.use(bodyParser.urlencoded({ extended: false }));

// Tell the express framework where the template is located
app.set("views", path.join(__dirname, "views"));
// Tell the express framework template what the default suffix is
app.set("view engine", "art");
// What template engine is used when rendering templates with the art suffix
app.engine("art", require("express-art-template"));

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
