// Module for creating a web server
const http = require("http");
// The app object is the web server object
const app = http.createServer();
// Module for processing request parameters
const querystring = require("querystring");
// When a request comes in from the client
app.on("request", (req, res) => {
  //post parameters are accepted by way of events
  //`data` The data event is raised when the request parameter is passed.
  //`end` The end event is raised when the passing of the parameter is complete.

  let postParams = "";

  req.on("data", (params) => {
    postParams += params;
  });

  req.on("end", () => {
    console.log(querystring.parse(postParams));
  });

  res.end("ok");
});
// 监听端口
app.listen(3000);
console.log("Web server started successfully");
