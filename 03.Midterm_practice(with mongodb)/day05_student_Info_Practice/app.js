// Introduce the http module
const http = require("http");
// Introduce the template engine
const template = require("art-template");
// Introduce the path module
const path = require("path");
// Introduce the static resource access module
const serveStatic = require("serve-static");
// Introduce a third-party module for handling dates
// const dateformat = require("dateformat");

const router = require("./route/index");
// Implement a static resource access service
const serve = serveStatic(path.join(__dirname, "public"));

// Configure the root directory of the template
template.defaults.root = path.join(__dirname, "views");
// Methods for handling date formats
// template.defaults.imports.dateformat = dateformat;

// database connection
require("./model/connect");

// Create the web server
const app = http.createServer();
// When the client accesses the server side
app.on("request", (req, res) => {
  // Enable the routing function
  router(req, res, () => {});
  // Enable the static resource access service function
  serve(req, res, () => {});
});
// Listen to the port
app.listen(3000);
console.log("Server started successfully");
