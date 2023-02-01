const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  //在文件夹里创建一个source-map
  devtool: "source-map",
  //Configuration entry
  entry: {
    app: "./src/app.js",
  },

  //configuration output
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "app.js",
  },
  //configuration loader

  module: {
    rules: [
      {
        test: /\.art$/,
        use: {
          loader: "art-template-loader",
          options: {
            escape: false,
          },
        },
      },
    ],
  },

  //configuration plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
      filename: "index.html",
      inject: true,
    }),
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
