//需要把用戶集合的構造函數,導入
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  //res.send("ok");
  //接受客戶端傳遞過來的請求參數
  const { username, email, role, state, password } = req.body;
  //req.query拿到id, id是即將要修改的用戶的id
  const id = req.query.id;
  //拿到密碼後,需要進行密碼比對
  //res.send(body.password);

  //調用user集合構造函數下的findOne方法獲取id
  let user = await User.findOne({ _id: id });
  //res.send(user);

  //返回boolean, 第一個參數為明文密碼, 第二個參數為數據庫中的密文
  const isValid = await bcrypt.compare(password, user.password);

  //密碼比對成功
  if (isValid) {
    //res.send("Password Matching Success");
    //將用戶信息更新到數據庫中
    await User.updateOne(
      { _id: id },
      {
        username: username,
        email: email,
        role: role,
        state: state,
      }
    );
    //將頁面重定向到用戶列表頁面
    res.redirect("/admin/user");
  } else {
    // res.send("Password Matching Failure");

    let obj = {
      path: "/admin/userEdit",
      message: "password does not match",
      id: id,
    };
    next(JSON.stringify(obj));
  }
};
