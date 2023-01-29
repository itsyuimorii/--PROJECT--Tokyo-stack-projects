const fs = require("fs");

fs.rmdir("./avatar", (err) => {
  if (err && err.code === "ENOENT") {
    console.log("目录不存在");
  }

  console.log(err);
});
