// 1. Introduce the system module - http
// 2. Create the web server
// 3. Add request events to the web server object
// 4. Implement the routing function
// 1. Get the request method of the client
// 2. Get the request address of the client

const http = require("http");
const url = require("url");

const app = http.createServer();

app.on("request", (req, res) => {
  // Get the request method
  const method = req.method.toLowerCase();
  // Get the request address
  const pathname = url.parse(req.url).pathname;

  res.writeHead(200, {
    "content-type": "text/html;charset=utf8",
  });

  if (method == "get") {
    if (pathname == "/" || pathname == "/index") {
      res.end("Welcome to the home page");
    } else if (pathname == "/list") {
      res.end("Welcome to the list page");
    } else {
      res.end("The page you are visiting does not exist");
    }
  } else if (method == "post") {
  }
});

app.listen(3000);
console.log("Server started successfully");
