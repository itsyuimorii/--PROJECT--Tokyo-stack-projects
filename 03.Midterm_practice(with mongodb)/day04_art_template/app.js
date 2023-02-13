// Importing the template engine
const template = require("art-template");
const path = require("path");
// The template method is used to splice strings
// 1. absolute path
const views = path.join(__dirname, "views", "index.art");

// 2. the data to be displayed in the template object type
// Returns the stitched string
const html = template(views, {
  name: "Matt",
  age: 20,
});

console.log(html);
