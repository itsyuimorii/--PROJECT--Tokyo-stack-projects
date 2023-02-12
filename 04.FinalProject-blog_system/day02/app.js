const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const app = http.createServer();

app.on("request", (req, res) => {
  // Get the user's request path
  let pathname = url.parse(req.url).pathname;

  pathname = pathname == "/" ? "/default.html" : pathname;

  // Convert the user's request path to the actual server hard drive path
  let realPath = path.join(__dirname, "public" + pathname);
  //mime getType method
  let type = mime.getType(realPath);
  console.log(type);

  fs.readFile(realPath, (error, result) => {
    if (error != null) {
      // Specify the type of file to return
      res.writeHead(404, {
        "content-type": "text/html;charset=utf8",
      });
      res.end("File read failure");
      return;
    }

    res.writeHead(200, {
      "content-type": type,
    });

    res.end(result);
  });
});

app.listen(3000);
console.log("Server started successfully: http://localhost:3000");
