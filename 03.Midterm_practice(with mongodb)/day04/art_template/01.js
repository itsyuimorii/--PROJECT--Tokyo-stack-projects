const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, "views", "01.art");

const html = template(views, {
  name: "Matt",
  age: 20,
  content: "<h1>here is h1</h1>",
});

console.log(html);
