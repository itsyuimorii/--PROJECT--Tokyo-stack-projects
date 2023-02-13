const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, "views", "03.art");

const html = template(views, {
  users: [
    {
      name: "matt",
      age: 20,
      sex: "male",
    },
    {
      name: "matt",
      age: 30,
      sex: "male",
    },
    {
      name: "matt",
      age: 15,
      sex: "male",
    },
  ],
});

console.log(html);
