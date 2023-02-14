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
 
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failure"));

```

> Set  collection rules

### 3. Connect to the database and design the student information table according to the requirements

model📁=>user.js

```js
// Set collection rules
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", studentSchema);
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
// Introduce the http module
const http = require("http");
// Introduce the path module
const path = require("path");
// Introduce the template engine
const template = require("art-template")
// Introduce a third-party module for handling dates
const dateformat = require("dateformat");

// Configure the root directory of the template
template.defaults.root = path.join(__dirname, "views");
// Methods for handling date formats
template.defaults.imports.dateformat = dateformat;

// database connection
require("./model/connect");

// When the client accesses the server side
app.on("request", (req, res) => {
  // Enable the routing function
  router(req, res, () => {});
});
// Listen to the port
app.listen(3000);
console.log("Server started successfully");


```

### 5. implement static resource access

> Function: Implement static resource access service

 Steps.
- Introduce the` serve-static` module to get the method to create the static resource service function
-  Call the method to create a static resource service and specify the static resource service directory
- Enable the static resource service function

```js
const serveStatic = require('serve-static')
const serve = serveStatic('public')
server.on('request', () => { 
    serve(req, res)
})
server.listen(3000)
```

```js
// Introduce the http module
const http = require("http");
// Introduce the template engine
const template = require("art-template");
// Introduce the path module
const path = require("path");
// Introduce the static resource access module
const serveStatic = require("serve-static");
// Introduce a third-party module for handling dates
const dateformat = require("dateformat");

const router = require("./route/index");
// Implement a static resource access service
const serve = serveStatic(path.join(__dirname, "public"));

// Configure the root directory of the template
template.defaults.root = path.join(__dirname, "views");
// Methods for handling date formats
template.defaults.imports.dateformat = dateformat;

// database connection
require("./model/connect");

// Create the web server
const app = http.createServer();
// When the client accesses the server side
app.on("request", (req, res) => {
  // Enable the routing function
  router(req, res, () => {});
  // Enable the static resource access service function
  serve(req, res, () => {});
});
// Listen to the port
app.listen(3000);
console.log("Server started successfully");

```

### 6. add student information

### 7. implement student information display function
