// 引入用户集合的构造函数
const { User, validateUser } = require("../../model/user");
// 引入加密模块
const bcrypt = require("bcrypt");
//這裡實現用戶添加功能
module.exports = async (req, res, next) => {
  // res.send("ok");
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    // Implementation Validation
    await validateUser(req.body);
  } catch (e) {
    //Verification failure
    //e.message
    // 重定向回用户添加页面
    // return res.redirect(`/admin/userEdit?message=${e.message}`);
    // JSON.stringify() 将对象数据类型转换为字符串数据类型
    return next(
      JSON.stringify({ path: "/admin/userEdit", message: e.message })
    );
  }

  // Check if the user exists by email address
  let user = await User.findOne({ email: req.body.email });
  // If the user already exists and the email address is already occupied by someone else
  if (user) {
    // Redirects back to the user add page
    //  return res.redirect(
    //     `/admin/userEdit?message=The email address is already occupied`
    //   );
    return next(
      JSON.stringify({
        path: "/admin/user-edit",
        message: "The email address is already occupied",
      })
    );
  }
  //對密碼進行加密處理
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  //res.send(req.body);
  // 将用户信息添加到数据库中
  await User.create(req.body);
  // 将页面重定向到用户列表页面
  res.redirect("/admin/user");
};
