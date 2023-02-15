// importing bcrypt
const bcrypt = require("bcrypt");

async function run() {
  // Generate a random string
  // The genSalt method takes a numeric value as an argument
  // The larger the value, the higher the complexity of the generated random string
  // the smaller the value, the lower the complexity of the generated random string
  // The default value is 10
  // Returns the generated random string
  const salt = await bcrypt.genSalt(10);
  // Encrypt the password
  // 1. the plaintext to be encrypted
  // 2. a random string
  // The return value is the encrypted password
  const result = await bcrypt.hash("123456", salt);
  console.log(salt);
  console.log(result);
}

run(); // importing bcrypt
const bcrypt = require("bcrypt");

async function run() {
  // Generate a random string
  // The genSalt method takes a numeric value as an argument
  // The larger the value, the higher the complexity of the generated random string
  // the smaller the value, the lower the complexity of the generated random string
  // The default value is 10
  // Returns the generated random string
  const salt = await bcrypt.genSalt(10);
  // Encrypt the password
  // 1. the plaintext to be encrypted
  // 2. a random string
  // The return value is the encrypted password
  const result = await bcrypt.hash("123456", salt);
  console.log(salt);
  console.log(result);
}

run();
