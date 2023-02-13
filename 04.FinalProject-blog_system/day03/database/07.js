// 引入mongoose第三方模块 用来操作数据库
const mongoose = require("mongoose");
// 数据库连接
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  // The connection was successful
  .then(() => console.log("Database connection successful"))
  // connection failed
  .catch((err) => console.log(err, "database connection failed"));

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    // 必选字段
    required: [true, "Please pass in the article title"],
    // The minimum length of the string
    minlength: [2, "The length of the article cannot be less than 2"],
    // Maximum length of the string
    maxlength: [5, "The maximum length of the article cannot exceed 5"],
    // Remove spaces from both sides of the string
    trim: true,
  },
  age: {
    type: Number,
    // Minimum range of numbers
    min: 18,
    // Maximum range of numbers
    max: 100,
  },
  publishDate: {
    type: Date,
    // Default value
    default: Date.now,
  },
  category: {
    type: String,
    // enumeration List the values that the current field can have
    enum: {
      values: ["html", "css", "javascript", "node.js"],
      message:
        "Category names are only allowed if they fall within a certain range",
    },
  },
  author: {
    type: String,
    validate: {
      validator: (v) => {
        // return a boolean value
        // true validation success
        // false validation failed
        // v the value to be validated
        return v && v.length > 4;
      },
      // Custom error message
      message: "The value passed in does not match the validation rules",
    },
  },
});

const Post = mongoose.model("Post", postSchema);

Post.create({ title: "aa", age: 60, category: "java", author: "bd" })
  .then((result) => console.log(result))
  .catch((error) => {
    // Get the error message object
    const err = error.errors;
    // Loop through the error message objects
    for (var attr in err) {
      // print the error message to the console
      console.log(err[attr]["message"]);
    }
  });
