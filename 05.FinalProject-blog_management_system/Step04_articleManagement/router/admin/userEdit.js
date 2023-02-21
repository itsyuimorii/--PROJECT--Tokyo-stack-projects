// 引入用户集合的构造函数
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //獲取到地址欄中的id參數

  //添加標識: 表示當前訪問的是用戶管理頁面
  // locals方法是可以顯示在模板裡的
  req.app.locals.currentLink = "user";

  const { message, id } = req.query;

  //如果當前傳遞了id參數, then, it is edit user info
  if (id) {
    let user = await User.findOne({ _id: id });
    //return res.send(user);

    //渲染用戶編輯頁面(修改)
    res.render("admin/userEdit", {
      message: message,
      user: user,
      link: "/admin/user-modify?id=" + id,
      button: "Edit",
    });
  } else {
    //添加操作
    res.render("admin/userEdit", {
      message: message,
      link: "/admin/userEdit",
      button: "Add",
    });
  }
};
