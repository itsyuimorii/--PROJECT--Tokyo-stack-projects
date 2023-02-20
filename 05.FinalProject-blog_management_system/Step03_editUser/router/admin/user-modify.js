//需要把用戶集合的構造函數,導入
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //res.send("ok");
  //接受客戶端傳遞過來的請求參數
  const body = req.body;
  //req.query拿到id, id是即將要修改的用戶的id
  const id = req.query.id;
  //拿到密碼後,需要進行密碼比對
  //res.send(body.password);

  //調用user集合構造函數下的findOne方法獲取id
  let user = await User.findOne({ _id: id });
  res.send(user);
};
