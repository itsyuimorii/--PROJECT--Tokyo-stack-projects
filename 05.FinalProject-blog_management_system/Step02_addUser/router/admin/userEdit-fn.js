module.exports = (req, res) => {
  //這裡實現用戶添加功能
  // res.send("ok");
  res.send(req.body);
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}
};
