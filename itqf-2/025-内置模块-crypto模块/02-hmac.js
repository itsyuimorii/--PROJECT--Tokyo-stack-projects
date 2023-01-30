const crypto = require("crypto");

// const hash = crypto.createHash("sha1")
const hash = crypto.createHmac("sha256", "kerwin");

hash.update("123456");
// hash.update("adwadwadwa")

console.log(hash.digest("hex"));
