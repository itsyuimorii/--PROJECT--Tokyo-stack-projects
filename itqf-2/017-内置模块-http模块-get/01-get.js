var http = require("http");
var https = require("https");
var url = require("url");

http
  .createServer((req, res) => {
    var urlobj = url.parse(req.url, true);
    // console.log(urlobj.query.callback)

    res.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
      //cors头，
      "access-control-allow-origin": "*",
    });

    switch (urlobj.pathname) {
      case "/api/aaa":
        //客户端 去猫眼要数据
        httpGet((data) => {
          res.end(data);
        });
        break;
      default:
        res.end("404");
    }
  })
  .listen(8080);

function httpGet(callback) {
  var data = "";
  https.get(
    `https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4`,
    (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(data);
        callback(data);
        // response.end(data)
      });
    }
  );
}
