# 💥👩🏻‍💻Blog Management System

## Overview

## 1. Initialization

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

## 2. Routing

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

## 3. Static Resource

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

> user.js

```js
/*-----testing code here------*/
//set collection 

const User = mongoose.model("User", userSchema);

User.create({
  username: "admin",
  email: "admin@example.com",
  password: "000000",
  role: "admin",
  state: 0,
})
  .then(() => {
    console.log("user created successfully");
  })
  .catch(() => {
    console.log("error creating user");
  });  

```

> app.js

```js
//database connection
require("./model/connect");
//Create initial user
require("./model/user");
```

 ```bash
 node app.js 
 api server running at http://127.0.0.1:3000
 Database connection successful
 user created successfully
 ```

![database](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/database.png)

## 6. Login 

### 1. Create a user collection and initialize users

- Connect to the database
- Create a collection of users
- Initialize users

### 2. Setup form action etc.

> set the ***request address**, **request method** and **form name attributes*** for the login form item

- Form submission needs to use `post`method, Because the post method to request parameters in the body, get is in the address bar to pass, not safe 

  > 📁views -> Login.art

```html
 <form action="/admin/login" method="post" id="loginForm">
 <input name ="email"...>
 <input name ="password"...>
```

### 3. Client Authentication

> when the user clicks the login button, the client ***verifies that the user*** has filled in the login form

- if one of the items is not entered, prevent the form from being submitted

a. **Block form default submission method**

```js
// Add a submit event to the form
<script type="text/javascript">
        $('#loginForm').on('submit', function () {
           return false;
        });
    </script>
```

b. 處理表單公共方法 `public->js->common.js`

```js

function serializeToJson(form) {
  var result = {};
  // [{name: 'email', value: 'User input'}]
  var f = form.serializeArray();
  f.forEach(function (item) {
    // result.email
    result[item.name] = item.value;
  });
  return result;
}
```

```js
//login.art
<script src="/admin/js/common.js"></script>
```

```js
    <script type="text/javascript">
        // Add a submit event to the form
        $('#loginForm').on('submit', function () {
            // Get the user input in the form
            var result = serializeToJson($(this))
            // If the user did not enter an email address
            if (result.email.trim().length == 0) {
                alert('Please enter an email address');
                // Stop the program from going down
                return false;
            }
            // If the user did not enter a password
            if (result.password.trim().length == 0) {
                alert('Please enter your password')
                // Stop the program from going down
                return false;
            }
        });
    </script>
```



### 4. Server side receives the request parameters from client side

> `app.js`
>
> Configure the module to handle the `post`request parameters

💥`app.use` intercepts all requests and passes them to the `urlencoded` method under `body-parser`, with the required parameter: `extended:false` (will be processed using the system module `queryString`)

```js
//third_party import
const bodyParser = require("body-parser");
//Configure the post request parameter, body-parser parsing file
app.use(bodyParser.urlencoded({ extended: false }));
```

> `admin.js` 
>
> To receive the request parameters (password and username entered by the user), use the `body-parser`

```js
//login routes
admin.post("/login", (req, res) => {
  //Receive request parameters (password and user name entered by the user)
  res.send(req.body);
});
```

### 5. Server side Authentication

> `admin.js`
>
> Verifies that the user has filled in the login form again 

- if one of them is not entered, respond for the client and stop the program from executing further

 ```js
 admin.post("/login", (req, res) => {
   //Receive request parameters (password and user name entered by the user)
   res.send(req.body); //Receive request parameters from the client
   
   // Secondary verification of request parameters
   const { email, password } = req.body; 
 	//If the user does not enter an email address
   if (email.trim().length == 0 || password.trim().length == 0)
     return res.status(400).send("<h4>Incorrect email address or password</h4>");
 });
 ```

### 6. Optimize the error page

> `admin.js`

> Optimize the error page

```js
  if (email.trim().length == 0 || password.trim().length == 0)
    //return res.status(400).send("<h4>Incorrect email address or password</h4>");
    return res
      .status(400)
      .render("admin/error", { msg: "Incorrect email address or password}" });
});
```

> err.art

```js
{{extend './common/layout.art'}}

{{block 'main'}}
	<p class="bg-danger error">{{msg}}</p>
{{/block}}
```

> Set the error page to jump automatically-client side

```js
{{block 'script'}}
	<script type="text/javascript">
		setTimeout(function () {
			location.href = '/admin/login';
		}, 3000)
	</script>
{{/block}}
```

### 7. According to the user's email, check whether the user exists

1. Look up user information based on email address

   - 將`model`📁裡的的`user`集合信息導入`router`📁 裡的`admin.js` -> `admin.post`路由

      ```js
      //import user set construction function
      const { User } = require("../model/user");
      ```

   - 獲取用戶輸入的參數

      ```js
      admin.post("/login", async (req, res) => {
      	//receive the request parameters
      	const { email, password } = req.body;
        
      .....
      ```

   - If the user does not enter an email address

      ```js
      // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>Incorrect email address or password</h4>');
        if (email.trim().length == 0 || password.trim().length == 0)
          return res
            .status(400)
            .render("admin/error", { msg: "Incorrect email address or password" });
      ```

   - If the user does not exist, **respond for the client** and prevent the program from executing downward

   - If the user exists, the user name and password are matched
   
      If the match is successful, the user logs in successfully
   
      If the comparison fails, the user fails to log in
   
      ```js
      let user = await User.findOne({ email });
        //Query the user
        if (user) {
          
          // Compare the password passed by the client with the password in the user information
          if (password == user.password) {
            // Login successfully
            res.send("Login successful");
          } else {
	         // No users were queried, Password Error
            res.status(400).render("admin/error", { msg: "Email address or password error" });
          }
        } else {
          // No user was queried
          res.status(400).render("admin/error", { msg: "Incorrect email address or password" });
        }
      });
      ```
      
   - Verify Third Party Package Password🔐 bcrypt
   
      ```js
      const bcrypt = require("bcrypt");
      
      let isValid = await bcrypt.compare(password, user.password);
      ```
   
### 8. **bcrypt** module

1. Install 

  ```js
  node-gyp -g
  npm install -g node-gyp
  ```

  ```js
  // Import the bcrypt module
  const bcrypt = require('bcrypt');
  // generate a random string gen => generate generate salt salt
  let salt = await bcrypt.genSalt(10);
  // encrypt the password with a random string
  let pass = await bcrypt.hash('plaintext password', salt);
  ```

  ```js
  // Password comparison
  let isEqual = await bcrypt.compare('plaintext password', 'encrypted password');
  ```

2. Example `hash.js`

```js
// importing bcrypt
const bcrypt = require('bcrypt');


async function run () {
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
	const result = await bcrypt.hash('123456', salt);
	console.log(salt);
	console.log(result);
}

run();// importing bcrypt
```

3. Create a new user, using bcrypt `model`📁 ->`User.js`

```js
/*-----testing code here------*/
//set collection
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("000000", salt);
  const user = await User.create({
    username: "admin",
    email: "admin@example.com",
    password: pass,
    role: "admin",
    state: 0,
  });
}
createUser();
```

![bcrpyt](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/bcrpyt.png)

4. Compare the passwords passed by the client with the passwords in the user information

```js
 if (user) {
    // 将客户端传递过来的密码和用户信息中的密码进行比对
    // Search user information by email address
    // return boolean true or false
    let isValid = await bcrypt.compare(password, user.password);
    // If the password match is successful
    if (isValid) {
      // Login successful
      // Store the username in the request object
      req.username = user.username;
      res.send("Login successful");

      // Redirects to the user list page
      //res.redirect("/admin/user");
```

### 💥Fake Registration Problem

這裡儘管輸入了密碼和用戶名顯示登錄成功,但是當登錄到http://127.0.0.1:3000/admin/user, 會顯示`user not found`

testing code 

```html
 <h4>user{{msg? msg: "user is not found"}}</h4>
```

![Screen Shot 2023-02-15 at 3.00.49 PM](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/fake%20user%20login.png)

> Here  need to introduce cookies and session

### 9. Cookie & session

- `cookie`: A **space** created by the browser on the computer's hard disk, mainly for storing data on the server side.
  - The data in the cookie is ***distinguished*** **in the form of domain.**
  - The data in the cookie **has an expiration date**, and the data will be ***deleted automatically*** by the browser after the expiration date.
  - The data in the cookie is ***automatically* sent to the server with the request**.
- `session`: it is actually an object, stored in the **server-side memory**, in the session object can also store multiple data, each data has a `session id` as a **unique identifier.**

![session](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/session.png)

> 中間件函數, app.use 攔截所有請求,並將請求交給session方法, 

方法內部: 

1. 為請求 增加一個屬性,等用戶登錄後, 保存用戶信息,生成Session id

2. 將session id 存儲在客戶端的cookie中, 等客戶再次訪問服務器的時候, 屬性是一個密鑰的值為了儲存信息, 





### 11. Login in all code

```js
//login routes
  admin.post("/login", async (req, res) => {
    //Receive request parameters (password and user name entered by the user)
    //res.send(req.body); //Receive request parameters from the client
  
    // Secondary verification
    //receive the request parameters
    const { email, password } = req.body;
    //If the user does not enter an email address
    // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>Incorrect email address or password</h4>');
    if (email.trim().length == 0 || password.trim().length == 0)
      return res
        .status(400)
        .render("admin/error", { msg: "Incorrect email address or password" });
    //-------Search user information by email address-------
    // If the user is queried, the value of the user variable is an object type, and the object stores the user's information.
    // If the user is not queried, the user variable is empty.
    let user = await User.findOne({ email });
    // The user is queried
    if (user) {
      // Match the password passed by the client with the password in the user information // Search user information by email address
      // true The comparison is successful
      // false Failed to match
      let isValid = await bcrypt.compare(password, user.password);
      // if the password match is successful
      if (isValid) {
        // login was successful
        // Store the username in the request object
        req.session.username = user.username;
        // res.send('Login successful');
        req.app.locals.userInfo = user;
        // redirect to user list page
        res.redirect("/admin/user");
      } else {
        // No users were queried
        res
          .status(400)
          .render("admin/error", { msg: "Incorrect email address or password" });
      }
    } else {
      // No user is queried
      res
        .status(400)
        .render("admin/error", { msg: "Incorrect email address or password" });
    }
  });
```

## Takeaway key points

