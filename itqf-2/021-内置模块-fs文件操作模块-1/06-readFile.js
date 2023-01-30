const fs = require("fs");
//error-first

// fs.readFile("./avatar/a.txt",(err,data)=>{
//     if(!err){
//         console.log(data.toString("utf-8"))
//     }
// })

fs.readFile("./avatar/a.txt", "utf-8", (err, data) => {
  if (!err) {
    console.log(data);
  }
});
