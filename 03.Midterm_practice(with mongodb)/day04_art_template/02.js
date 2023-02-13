const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, "views", "02.art");

const html = template(views, {
  name: "matt",
  age: 17,
});

console.log(html);
