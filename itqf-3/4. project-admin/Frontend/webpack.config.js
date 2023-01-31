const path = require("path");

module.exports = {
  //Configuration entry
  entry: {
    app: "./src/app.js",
  },

  //configuration output
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "app.js",
  },
};
