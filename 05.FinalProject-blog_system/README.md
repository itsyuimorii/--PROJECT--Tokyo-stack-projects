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

![geekspace login](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/geekspace%20login.png) 

### 💥External Chain Resources⚠️

**The external link resource in template 📃, its relative path is relative to the request path in the browser**, Then this **request path** will change, not safe! So in the template to use the absolute path to represent the relative path, - **"/"** represents the **absolute path.** 

The relative path in the template is relative to the request path in the browser, so there is a problem here, if you change app.use`("/admin", adminRouter)` to `app.use("/abc", adminRouter)`, css 📃 will not be found

So in the `login.art` file, you need to add `/admin/`

```js
<a href="/admin/lib/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="/admin/css/base.css" />
      
<script src="/admin/lib/jquery/dist/jquery.min.js"></script>
<script src="/admin/lib/bootstrap/js/bootstrap.min.js"></script>
```

## 4. Optimization Template

抽離admin中 html 📃裡的common part 

admin📁-> common📁 -> aside.art

```js
  <!-- Sidebar -->
  <div class="aside fl">
    <ul class="menu list-unstyled">
      <li>
        <a class="item active" href="user.html">
          <span class="glyphicon glyphicon-user"></span>
          User Management
        </a>
      </li>
          <li>
            <a class="item" href="article.html">
              <span class="glyphicon glyphicon-th-list"></span>
              Article Management
            </a>
          </li>
        </ul>
        <div class="cprt">
            Powered by
            <a href="https://itsyuimorii.github.io/" target="_blank"
              >itsyuimorii</a
            >
          </div>
      </div>
      <!-- Sidebar -->
```

>  header.art

```js
    <!-- header -->
    <div>
    <div class="header">
      <!-- logo -->
      <div class="logo fl">Geek <i>Space</i></div>
      <!-- /logo -->
      <!-- User Information -->
      <div class="info">
        <div class="profile dropdown fr">
          <span class="btn dropdown-toggle" data-toggle="dropdown">
            admin
            <span class="caret"></span>
          </span>
          <ul class="dropdown-menu">
            <li><a href="user-edit.html">Personal Information</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      <!-- /user information -->
    </div>
    <! -- /user information -->
</div>
<! -- /header -->
```

> layout.art

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Blog - Content Manager</title>
    <link rel="stylesheet" href="/admin/lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/admin/css/base.css">
    {{block 'link'}}{{/block}}
</head>

<body>
	{{block 'main'}} {{/block}}
	<script src="/admin/lib/jquery/dist/jquery.min.js"></script>
	<script src="/admin/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="/admin/js/common.js"></script>
	{{block 'script'}} {{/block}}
</body>

</html>
```

## 5. Database

> model📁 ->connect.js

```js
const mongoose = require("mongoose");
// Connecting to the database
mongoose
  .connect("mongodb://localhost/blog", { useNewUrlParser: true })
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failure"));

```

> model📁 ->user.js

```js
const mongoose = require("mongoose");

//set collection rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  //0 is enabled, 1 is disabled
  state: {
    type: Number,
    default: 0,
  },
});

//set collection
const User = mongoose.model("User", userSchema);

module.exports = {
  User: User,
};
```

> app.js

```js
//database connection
require("./model/connect");
//Create initial user
require("./model/user");
```

