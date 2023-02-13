const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, "views", "04.art");

const html = template(views, {
  msg: "i am homepage",
});

console.log(html);
