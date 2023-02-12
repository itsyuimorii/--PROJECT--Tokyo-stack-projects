const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err, "Database connection failed"));

// Create collection rules
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String],
});

// Create collections using rules
const User = mongoose.model("User", userSchema);

// 查询用户集合中的所有文档
// User.find().then(result => console.log(result));
// 通过_id字段查找文档
// User.find({_id: '5c09f267aeb04b22f8460968'}).then(result => console.log(result))

// findOne方法返回一条文档 默认返回当前集合中的第一条文档
// User.findOne({name: '李四'}).then(result => console.log(result))
// 查询用户集合中年龄字段大于20并且小于40的文档
// User.find({age: {$gt: 20, $lt: 40}}).then(result => console.log(result))
// 查询用户集合中hobbies字段值包含足球的文档
// User.find({hobbies: {$in: ['足球']}}).then(result => console.log(result))
// 选择要查询的字段
// User.find().select('name email -_id').then(result => console.log(result))
// 根据年龄字段进行升序排列
// User.find().sort('age').then(result => console.log(result))
// 根据年龄字段进行降序排列
// User.find().sort('-age').then(result => console.log(result))
// 查询文档跳过前两条结果 限制显示3条结果
User.find()
  .skip(2)
  .limit(3)
  .then((result) => console.log(result));
