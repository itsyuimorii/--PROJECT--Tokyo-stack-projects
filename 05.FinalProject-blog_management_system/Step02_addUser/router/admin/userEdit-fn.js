// 引入用户集合的构造函数
const { User, validateUser } = require("../../model/user");
// 引入加密模块
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  //這裡實現用戶添加功能
  // res.send("ok");
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    // Implementation Validation
    await validateUser(req.body);
  } catch (e) {
    //Verification failure
    //e.message
    //Redirect back to the user add page
    return res.redirect(`/admin/userEdit?message=${e.message}`);
  }

  // Check if the user exists by email address
  let user = await User.findOne({ email: req.body.email });
  // If the user already exists and the email address is already occupied by someone else
  if (user) {
    // Redirects back to the user add page
    return res.redirect(
      `/admin/userEdit?message=The email address is already occupied`
    );
    //return next(JSON.stringify({path: '/admin/user-edit', message: 'The email address is already occupied'}))
  }
  res.send(user);
};
