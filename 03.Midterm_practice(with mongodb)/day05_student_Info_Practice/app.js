const http = require("http");
//import router module
const getRouter = require("router");
//get router object
const router = getRouter();

router.get("/test", (req, res) => {
  res.end("test");
});

router.get("/index", (req, res) => {
  res.end("index");
});

//<<<<<<database>>>>>
//connect database
require("./model/connect");
//get students collection
const Student = require("./model/users");

//create server
const app = http.createServer();

//adding request events to server objects
app.on("request", (req, res) => {
  router(req, res, () => {});
});

app.listen(3000);
