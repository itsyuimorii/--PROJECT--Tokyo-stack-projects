const http = require("http");
const url = require("url");

//create server
const app = http.createServer();
//Adding request events to server objects
app.on("request", (req, res) => {
  //請求方式
  req.method = req.method;
  //request method
  const { pathname } = url.parse(req.url);
  if (method === "GET") {
    // present the user list page
    if (pathname == "/list") {
    }
  } else if (method === "POST") {
    if (pathname == "/add") {
      let formData = "";
      req.on("data", (param) => {
        formData = param;
      });
    }
  }
  res.end("ok");
});

app.listen(3000);
