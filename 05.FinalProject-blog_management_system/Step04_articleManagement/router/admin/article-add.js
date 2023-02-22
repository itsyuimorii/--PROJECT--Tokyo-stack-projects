const formidable = require("formidable");
const path = require("path");

module.exports = (req, res) => {
  // res.send("ok");
  //1. 創建表單解析對象
  const form = new formidable.IncomingForm();
  //2. 配置上傳文件的存放位置
  //這裡建議用absolute 路徑
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");

  //3. 保留上傳文件的後綴
  form.keepExtension = true;

  //4. parse the form
  form.parse(req, async (err, fields, files) => {
    //當表單parse完成後, 回調函數返回3個參數. err

    // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
    // 2.fields 对象类型 保存普通表单数据
    // 3.files 对象类型 保存了和上传文件相关的数据
    // res.send(files.cover.path.split('public')[1])
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split("public")[1],
      content: fields.content,
    });
    // 将页面重定向到文章列表页面
    res.redirect("/admin/article");
  });
  // res.send('ok');
};
