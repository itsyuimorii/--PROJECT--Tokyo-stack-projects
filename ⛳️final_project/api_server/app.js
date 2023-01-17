// 导入 express 模块
const express = require("express");
const cors = require("cors");
//创建服务器的实例对象
const app = express();

// 导入 cors 中间件
const cors = require("cors");
// 将 cors 注册为全局中间件
app.use(cors());

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, () => {
  console.log("api server is listening on http://127.0.0.1");
});
