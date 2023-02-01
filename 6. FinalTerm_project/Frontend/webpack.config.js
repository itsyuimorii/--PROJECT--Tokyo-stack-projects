const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  //在文件夹里创建一个source-map
  devtool: "source-map",
  //Configuration entry
  entry: {
    "js/app": "./src/app.js",
  },

  //configuration output
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
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
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
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
        {
          from: "./public/libs",
          to: path.join(__dirname, "./dist/libs"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
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
