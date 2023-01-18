////////////////////导入所需模块👇
//1. 导入 express 模块
const express = require("express");
//2. 创建服务器的实例对象
const app = express();
////////////////////配置cors跨域👇
// 4.1 导入 cors 中间件
const cors = require("cors");
// 4.2 将 cors 注册为全局中间件
app.use(cors());
////////////////////导入并注册用户路由模块👇
const userRouter = require("./router/user");
/* 用app.use 注册为路由模块, /api表示在访问userRouter里面每一个模块的时候, 都必须加入/api前缀 */
app.use("/api", userRouter);

////////////////////配置解析表单数据的中间件👇
//4.3 (注意：这个中间件，只能解析application/x-www-form-urlencoded 格式的表单数据)
app.use(express.urlencoded({ extended: false }));

////////////////////调用 app.listen 方法👇指定端口号并启动web服务器
//3. 启动服务器
app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
