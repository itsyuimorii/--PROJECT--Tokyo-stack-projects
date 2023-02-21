const { User } = require("../../model/user");

module.exports = async (req, res) => {
  // res.send("ok");
  //獲取要刪除的用戶id
  //res.send(req.query.id); //63f43b554ae2fffe66627db4

  //console.log(id);
  await User.findOneAndDelete({ _id: req.query.id });
  //將用戶重定向到用戶列表頁面
  res.redirect("/admin/user");
};
