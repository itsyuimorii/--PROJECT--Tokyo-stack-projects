# 🚀 総合的な演習例 student info management(mongodb,art_template)

## 0. all Steps:

1. Create the project folder and generate the project description file
2. create web server to implement client-server communication
3. connect to the database and design the student information table according to the requirements
4. create routes and implement page template presentation
5. implement static resource access
6. add student information
7. implement student information display function

## 1. create web server to implement client-server communication

```js
const http = require("http");

//create server
const app = http.createServer();
//Adding request events to server objects
app.on("request", (req, res) => {
  res.end("ok");
});

app.listen(3000);
```

## 2. Connect to mongodb

model📁=>connect.js

```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground"),
  { userNewUrlParser: true }
    .then(() => console.log("database connection established"))
    .catch(() => console.log("database connection failed"));
```

> Set  collection rules

### 3. Connect to the database and design the student information table according to the requirements

model📁=>user.js

```js
// Set collection rules
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: "number",
    min: 18,
    max: 80,
  },
  sex: {
    type: "String",
  },
  email: String,
  hobbies: [String],
  college: String,
  entryDate: {
    type: Date,
    default: Date.now,
  },
});
//create collection, return collection construct function
const studentsSchema = mongoose.model("User", userSchema);

const Student = mongoose.model("Student", studentsSchema);
// Export the student information collection
module.exports = Student;

```

After creating the collection rule, you need to create the collection and use the collection rule instance `studentsSchema `that you have just created.

> create collection

```js
//create collection, return collection construct function
const studentsSchema = mongoose.model("User", userSchema);
```

💡`mongoose.model("User",userSchema)` will get a **construct function** here, and use `User` to receive it, The later additions, deletions, and changes to the database all rely on this structured function `User`

import user.json file to mongodb

```js
mongoimport -d playground -c users --jsonArray ./user.json
```

###  4. Create routes and implement page template presentation

Third-party module: `router`

> Steps to use:

1. Get the routing object
2. Call the methods provided by the route object to create the route
3. Enable the route and make it effective

```js
const getRouter = require('router')
const router = getRouter();
router.get('/add', (req, res) => {
    res.end('Hello World!')
}) 
server.on('request', (req, res) => {
    router(req, res)
})
```

