////////////////////导入所需模块👇
//1. 导入 express 模块
const express = require("express");
//2. 创建服务器的实例对象
const app = express();
//4. 导入Joi校验数据
const joi = require("joi");

////////////////////配置cors跨域👇
// 4.1 导入 cors 中间件
const cors = require("cors");
// 4.2 将 cors 注册为全局中间件
app.use(cors());

////////////////////配置解析表单数据的中间件👇
//4.3 (注意：这个中间件，只能解析application/x-www-form-urlencoded 格式的表单数据)
app.use(express.urlencoded({ extended: false }));

////////////////////优化res.send-响应数据的中间件👇
/* 在处理函数中，需要多次调用 `res.send()` 向客户端响应 `处理失败` 的结果，为了简化代码，可以手动封装一个 res.encap() 函数 */
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.encap = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 一定要在路由之前配置解析 Token 的中间件
// 导入配置文件
const { expressjwt } = require("express-jwt");
const config = require("./config");

app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api/],
  })
);

////////////////////// 导入并使用用户路由模块👇
const userRouter = require("./router/user");
/* 用app.use 注册为路由模块, /api表示在访问userRouter里面每一个模块的时候, 都必须加入/api前缀 */
app.use("/api", userRouter);

/* //挂载body-parser
//要注意body-parser在项目代码中的挂载位置
//应该挂载的位置是：在使用路由之前
//项目入口文件会挂载我们编写好的路由，就是放在这些路由的前面 */

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.encap(err);
  // 身份认证失败后的错误
  if (err.name === "UnauthorizedError") return res.encap("身份认证失败！");
  // 未知的错误
  res.encap(err);
});

////////////////////调用 app.listen 方法👇指定端口号并启动web服务器
//3. 启动服务器
app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
