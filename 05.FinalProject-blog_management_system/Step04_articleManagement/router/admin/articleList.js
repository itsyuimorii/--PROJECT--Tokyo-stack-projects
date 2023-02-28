// Import the constructor of the article collection into the current file
const { Article } = require("../../model/article");
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // Receive the page number passed from the client
  const page = req.query.page;
  // Identifies that you are currently visiting the article management page
  req.app.locals.currentLink = "article";

  // Query all article data .populate()Multi-collection Joint Inquiry
  //let articles = await Article.find().populate("author").lean();
  //res.send(articles);

  // page specifies the current page
  // size specifies the number of data items to be displayed per page
  // display specifies the number of page numbers to be displayed by the client
  // exec sends a query request to the database
  let articles = await pagination(Article)
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate("author")
    .exec();

  //res.send(articles);

  // Render article list page template
  res.render("admin/article.art", {
    articles: articles,
  });
};
