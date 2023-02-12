const fs = require("fs");
// Modify the existing asynchronous function api to return a promise object, thus supporting asynchronous function syntax
const promisify = require("util").promisify;
// call the promisify method to adapt the existing asynchronous API to return a promise object
const readFile = promisify(fs.readFile);

async function run() {
  let r1 = await readFile("./1.txt", "utf8");
  let r2 = await readFile("./2.txt", "utf8");
  let r3 = await readFile("./3.txt", "utf8");
  console.log(r1);
  console.log(r2);
  console.log(r3);
}

run();
