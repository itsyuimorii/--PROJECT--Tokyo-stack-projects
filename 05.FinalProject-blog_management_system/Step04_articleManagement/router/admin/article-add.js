const formidable = require("formidable");

module.exports = (req, res) => {
  //1. 創建表單解析對象
  const form = new formidable.IncomingForm();
  //2. 指定上傳文件的路徑
  res.send("ok");
};
