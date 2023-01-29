const fs = require("fs");

fs.stat("./avatar/b.txt", (err, data) => {
  console.log(data.isFile());
  console.log(data.isDirectory());
});
