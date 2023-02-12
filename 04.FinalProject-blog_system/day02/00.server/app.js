// Module for creating a web server
const http = require("http");
// Used to handle url addresses
const url = require("url");
// The app object is the web server object
const app = http.createServer();
// When a request comes in from the client
app.on("request", (req, res) => {
  // Get the request method
  // req.method
  // console.log(req.method);

  // Get the request address
  // req.url
  // console.log(req.url);

  // get request message information
  // req.headers
  // console.log(req.headers['accept']);

  res.writeHead(200, {
    "content-type": "text/html;charset=utf8",
  });

  console.log(req.url);
  // 1) the url address to be parsed
  // 2) parse the query parameters into object form
  let { query, pathname } = url.parse(req.url, true);
  console.log(query.name);
  console.log(query.age);

  if (pathname == "/index" || pathname == "/") {
    res.end("<h2>Welcome to the home page</h2>");
  } else if (pathname == "/list") {
    res.end("welcome to listpage");
  } else {
    res.end("not found");
  }

  if (req.method == "POST") {
    res.end("post");
  } else if (req.method == "GET") {
    res.end("get");
  }

  // res.end('<h2>hello user</h2>');
});
// Listening to the port
app.listen(3000);
console.log("Web server started successfully");
