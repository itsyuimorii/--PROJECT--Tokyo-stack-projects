////////Model
const express = require("express");

//从express拿出路由中间件
const router = express.Router();

const { list } = require("../controller");
// console.log(router);
// 这里只是中间件,还没有挂在自己写的api
router.get("/", list);
// router.post("/index", (req, res, next) => {
//   const data = req.body;
//   console.log(data);
//   res.send(data);
// });

module.exports = router;
