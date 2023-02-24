module.exports = (req, res) => {
  //添加標識: 表示當前訪問的是用戶管理頁面
  req.app.locals.currentLink = "article";
  res.render("admin/article-edit.art");
};
