const fs = require("fs");

fs.writeFile("./avatar/a.txt", "你好", (err) => {
  console.log(err);
});
