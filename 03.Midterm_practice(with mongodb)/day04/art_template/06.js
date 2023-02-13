const template = require("art-template");
const path = require("path");
const dateFormat = require("dateformat");

// Set the root directory of the template
template.defaults.root = path.join(__dirname, "views");

// Importing template variables
template.defaults.imports.dateFormat = dateFormat;

// Configure the default suffix of the template
template.defaults.extname = ".html";

const html = template("06.art", {
  time: new Date(),
});

console.log(template("07", {}));
console.log(html);
