const express = require("express");
const app = express();

//配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")));

app.listen(3000, () => {
  console.log("listening 鸥鸟h");
});
