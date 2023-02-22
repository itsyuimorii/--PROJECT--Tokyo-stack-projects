const formidable = require("formidable");
const path = require("path");
const { Article } = require("../../model/article");

module.exports = (req, res) => {
  // res.send("ok");
  //1. create form parsing object
  const form = new formidable.IncomingForm();
  //2. Configure the location of the upload file
  //It is recommended to use the absolute path here
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");

  //3. Keep the suffixes of the uploaded files
  form.keepExtensions = true;

  //4. parse the form

  /*  form.parse(req, (err, fields, files) => {
    res.send(files);
    res.send(fields);
  }); */

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split("public")[1],
      content: fields.content,
    });
    // Redirects the page to the article list page
    res.redirect("/admin/article");
  });
  // res.send('ok');
};
