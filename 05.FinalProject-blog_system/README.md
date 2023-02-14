# 👩🏻‍💻Blog Management System

## Overview

## 1. initialization

1. create the required folder for the project
   `public` Static resources
   `model` database operations
   `route` Routing
   `views` templates
2. initialize the project description file
   `npm init -y`.
3. download the required third-party modules for the project
   `npm install express mongoose art-template express-art-template`
4. create the web server

```js
// Referencing the expess framework
const express = require("express");
// Create the web server
const app = express();

app.listen("Server listening on http://localhost:80");
```

## 2. routing

router📁-> admin.js

```js
// Blog administration page routing
const express = require(" express");

//create routes for blog administration
const admin = express.Router();

// Export the routing object as a member of the routing module
module.exports = admin;
```

router📁-> home.js

```js
// Blog display page routing

const express = require("express");
//create routes for blog display page

const home = express.Router();

home.get("/", (req, res) => {
  res.send("welcome to the home page");
});

// Export the routing object as a member of the routing module
module.exports = home;
```

app.js

```js
//import routes from router file
const homeRouter = require("./router/home");
const adminRouter = require("./router/admin");

// Match the first level request path to the routing object, introduce the routing module
app.use("/home", homeRouter);
app.use("/admin", adminRouter);
```

## 3. static resource

There are two folders in public📁, `admin` and` home`,  which are used for art files respectively 

```js
//Open Static Source File
app.use(express.static(path.join(__dirname, "public")));
```

```js
// Tell the express framework where the template is located
app.set('views', path.join(__dirname, 'views'));
// Tell the express framework template what the default suffix is
app.set('view engine', 'art');
// What template engine is used when rendering templates with the art suffix
app.engine('art', require('express-art-template'));
```

then jump to router 📁 ->admin.js

```js
admin.get("/login", (req, res) => {
  res.render("admin/login");
});
```

Enter `localhost:3000/admin/login` in your browser and you will see the page rendered by `login.art`

