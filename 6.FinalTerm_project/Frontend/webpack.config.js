const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  //Configuration entry
  entry: {
    app: "./src/app.js",
  },

  //configuration output
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "app.js",
  },

  //configuration plugins
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./public/*.ico",
          to: path.join(__dirname, "./dist/favicon.ico"),
        },
      ],
    }),
  ],

  // configuration  server
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    compress: true,
    port: 9000,
  },
};
