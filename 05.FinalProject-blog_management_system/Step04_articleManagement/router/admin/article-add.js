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
  /*   form.parse(req, (err, fields, files) => {
    //res.send(files);
    //字符串分隔符,分割完後是一個數組,當前我們要取下標為1的
    // res.send(fields);
  }); */
  /* 
  When the form parse is completed, the callback function  returns 3 parameters.
    
  - `err` error object If the form fails to be parsed, err   stores the error message; if the form is parsed  successfully, err will be null
  - `fields` object type stores common form data
  - `files` object type stores data related to uploaded files
  */
  form.parse(req, (err, fields, files) => {
    if (files.cover) {
      res.send(files.cover.path.split("public")[1]);
      res.send(files);
    }
  });

  // res.send('ok');
};
