// 将文章集合的构造函数导入到当前文件中
const { Article } = require("../../model/article");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // 接收客户端传递过来的页码
  const page = req.query.page;
  // 标识 标识当前访问的是文章管理页面
  req.app.locals.currentLink = "article";

  // 查询所有文章数据 .populate()多集合聯合查詢
  //let articles = await Article.find().populate("author").lean();
  //res.send(articles);
  let articles = await pagination(Article)
    // page specifies the current page
    // size specifies the number of data items to be displayed per page
    // display specifies the number of page numbers to be displayed by the client
    // exec sends a query request to the database
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate("author")
    .exec();

  res.send(articles);

  // 渲染文章列表页面模板
  /* res.render("admin/article.art", {
    articles: articles,
  }); */
};
