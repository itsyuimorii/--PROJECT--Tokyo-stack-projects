// 1. Introduce the mongoose module
const mongoose = require("mongoose");

// 2. Create article collection rules
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, "Please enter the title"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the author"],
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
    default: null,
  },
  content: {
    type: String,
  },
});

// 3. Create collections based on rules

const Article = mongoose.model("Article", articleSchema);

// 4. Export the collection as a module member
module.exports = {
  Article,
};
