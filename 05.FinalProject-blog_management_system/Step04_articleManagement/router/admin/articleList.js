// Import the constructor of the article collection into the current file
const { Article } = require("../../model/article");
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // Receive the page number passed from the client
  const page = req.query.page;
  // Identifies that you are currently visiting the article management page
  req.app.locals.currentLink = "article";

  // Query all article data .populate()Multi-collection Joint Inquiry
  //let articles = await Article.find().populate("author").lean();
  //res.send(articles);
  let articles = await pagination(Article)
    // page specifies the current page
    // size specifies the number of data items to be displayed per page
    // display specifies the number of page numbers to be displayed by the client
    // exec sends a query request to the database
    .find()
    .page(1)
    .size(2)
    .display(2)
    .populate("author")
    .exec();

  //res.send(articles);

  // Render article list page template
  res.render("admin/article.art", {
    articles: articles,
  });
};
