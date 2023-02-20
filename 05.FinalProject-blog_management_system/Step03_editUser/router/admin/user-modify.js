module.exports = (req, res) => {
  //res.send("ok");
  //接受客戶端傳遞過來的請求參數
  const body = req.body;
  //req.query拿到id, id是即將要修改的用戶的id
  const id = req.query.id;

  res.send(body.password);
};
