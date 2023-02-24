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

   - Get the parameters entered by the user

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

> middleware function, app.use intercepts all requests and passes them to the session method, 

How the method works internally: 

1. add an attribute to the request, wait for the user to log in, save the user information and generate the session id

2. store the session id in the client's cookie, and when the client accesses the server again, the attribute is a key value to store the information, 

**router📁->admin.js**

```js
const session = require("express-session");
admin.post("/login", async (req, res) => {
  ...
     if (isValid) {
      // login was successful
      // Store the username in the request object
      req.session.username = user.username;
      // res.send('Login successful');
      // redirect to user list page
      res.redirect("/admin/user");
    } else {
      // No users were queried
      res
        .status(400)
        .render("admin/error", { msg: "Incorrect email address or password" });
    }
  ...
```

### 10. How to expose the public data to the template? 

把數據放在locals對象中, 就可以暴露給模板, 就不用`res.render`渲染給模板了

The **app.locals** object has properties that are local variables within the application. These variables are local to the application and are very useful.

**Syntax:**

```
app.locals
```

**router📁->admin.js**

```js
req.app.locals.userInfo = user;
```

Views📁=>admin📁=>common📁=> header.art

```html
 {{userInfo.username}}
```

### 11. Landing Interception

> When the user is not logged in, the administration page of the blog is not visible to the user



在 Views📁=>admin📁=>common📁=> header.art 下, 改為👇

>先判斷有沒有`userinfo`, 如果有再看`username`

```
{{userInfo && userInfo.username}}
```

if not `/admin`, intercept request

`app.js ` \

> `const guard`  must be exist before route `app.use("/admin", adminRouter);`
>
> 1. Determining whether the user is visiting a login page
> 2. Determine the user's login status
>    1. If the user is logged in, the request is released
>    2. If the user is not logged in, redirect the request to the login page

```js
// Intercept requests to determine user login status
app.use('/admin', (req, res)=>{
	if (req.url != '/login' && !req.session.username) {
		res.redirect('/admin/login');
	} else {
		// User is logged in Release the request
		next();
	}
}
module.exports = guard;
}

//import routing module
//Match the first level request path to the routing object,
app.use("/home", homeRouter);
app.use("/admin", adminRouter);
```

### 12. Optimized middleware code

middleware📁 => loginGuard

```js
const guard = (req, res, next) => {
  /* 
1. Determining whether the user is visiting a login page
2. Determine the user's login status
   1. If the user is logged in, the request is released
   2. If the user is not logged in, redirect the request to the login page */

  if (req.url != "/login" && !req.session.username) {
    res.redirect("/admin/login");
  } else {
    // User is logged in Release the request
    next();
  }
};
module.exports = guard;
```

```js
// Intercept requests to determine user login status
app.use("/admin", require("./middleware/loginGuard"));
```

### 13. Separate Routing Code

Router📁 -> login.js

```js
//login routes
admin.post("/login", require("./admin/login"));
```

Router📁 -> admin📁 -> login.js

```js
//import user set construction function from database

const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
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
      //res.send("Login successful");
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
};

```

### 14.Stages Code

LOCATION : [Step01_login](https://github.com/itsyuimorii/Tokyo-stack-projects/tree/main/05.FinalProject-blog_management_system/Step01_login)

## 7. addUsers

> Adding a user is an action that  insert to database, so use `post`

1. Create a link to the Add User button on the user list page

2. Create a link to the corresponding route and render the new user template in the route handler function

3. Specify the request address and request method for the new user form, and add the name attribute to the form item

4. Create a route that implements the function of adding users (點擊submit後的post 操作)

5. Receive the request parameters from the client

6. Validate the format of the request parameters

7. Verify whether the current email address to be registered has already been registered

8. Encrypt the password

9. Add user information to the database

10. Redirect the page to the user list page

### 1. Add a link🔗 to the `Add User` button` on the user list page

- Views📁=>admin📁=>common📁=> user.art

  ```js
   <a href="/admin/user-edit" class="btn btn-primary new">New Users</a> 
  ```

### 2. Add a connection corresponding to the `route` and render the `new user template` in the route handling function

> router📁 ->`admin.js`

  ```js
  //edit page routes
  admin.get("/userEdit", require("./admin/userEdit"));
  ```
> router📁-> admin📁-> userEdit.js

 ```js
   module.exports = (req, res) => {
     res.render("admin/userEdit");
   };
 ```

> Open the browser to refresh, click Add User, and you will find: you can jump to the form page now.
>
> ![Screen Shot 2023-02-19 at 9.18.08 AM](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/user-edit-fomr.png)

### 3. Specify request address and request method for new user forms, add `name` attribute to form items

> Views📁=>admin📁=>common📁=> userEdit.art

```html
<form class="form-container" method="post" action="/admin/userEdit">
 
<input name="username" type="text" class="form-control" placeholder="Please enter your username">
 
<input name="email" type="email" class="form-control" placeholder="Please enter your email address">
 
<input name="password" type="password" class="form-control" placeholder="Please enter your password">
 
<select name="role" class="form-control">
         <option value="normal">普通用户</option>
         <option value="admin">超级管理员</option>
</select>
 
<select name="state" class="form-control">
         <option value="0">启用</option>
         <option value="1">禁用</option>
</select>
```

### 4. Create a route for adding users (click `post` after `submit`)

> Router📁=>admin📁=> userEdit-fn.js

```js
// 创建实现添加用户功能
admin.post('/user-Edit', require('./admin/userEdit-fn'));

module.exports = (req, res) => {
  //這裡實現用戶添加功能
  res.send("ok");
};
```

> Go back to the browser to refresh the form page, click the submit button, you can see: the browser page shows ok, indicating that the route was created successfully.

### 5. Receive the request parameters passed by the client

user-edit-fn.js ：

```js
module.exports = (req, res) => {
  // here to implement the user add function
  res.send(req.body);
};
//refresh the browser, enter some random information and click submit. You can see: the received request parameters

//{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}
```

### 6. Validate the format of the request parameters (😤)

### Joi module 💥 @14.3.1 

> ❌**Error**❌:` Joi.validate is not a function` is that this method has been deprecated by joi, and there are two ways to solve it
>
> ```js
> npm uninstall joi
> npm install joi@14.3.1
> ```
>
> way2 : 
>
> ```js
> // Introduce joi module
> const Joi=require('joi')
> 
> module.exports=async(req,res)=>{
> 
>   //Define the validation rules for the object
>   const schema = Joi.object({
>     username: Joi.string()
>       .min(2)
>       .max(12)
>       .required()
>       .error(new Error("Invalid username")),
>     email: Joi.string().email().required().error(new Error("Invalid email")),
>     password: Joi.string()
>       .regex(/^[a-zA-Z0-9]{3,30}$/)
>       .required()
>       .error(new Error("Invalid password")),
>     role: Joi.string()
>       .valid("normal", "admin")
>       .required()
>       .error(new Error("Invalid Value")),
>     state: Joi.number()
>       .valid(0, 1)
>       .required()
>       .error(new Error("Invalid status")),
>   });
> })
> ```

![submit add user](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/user-edit-fomr.png)

> Route📁=>admin📁=>userEdit-fn.js 👇

```js
const Joi = require("joi");

module.exports = async (req, res) => {
  // here to implement the user add function
  // res.send("ok");
  //{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}

  //Define the validation rules for the object
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("Invalid username")),
    email: Joi.string().email().required().error(new Error("Invalid email")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("Invalid password")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("Invalid Value")),
    state: Joi.number()
      .valid(0, 1)
      .required()
      .error(new Error("Invalid status")),
  });
  // Use try{}catch(){} statements to catch exceptions for asynchronous functions
  try {
    //implement validation
    await schema.validateAsync(req.body);
  } catch (e) {
    //Validation did not pass
    console.log(e.message)
    //redirect back to the user add page
    return res.redirect(`/admin/userEdit?message = ${e.message}`);
  }
  //If you write res.send(req.body) at the end, you can ➕return before res.direct so that the following code does not execute
  // res.send(req.body);
};
```

> Note: 👆 above try. .catch idea above is: 
>
> 💡 In `/admin/userEdit-fn`, when the user clicks the submit button, the page will jump, actually to the `/admin/userEdit` page, so rendering `res.render` in `user.Edit` will result in this message in the art file message in the art file. 



Route📁=>admin📁=>userEdit.js 👇

```js
module.exports = (req, res) => {
  const { message } = req.query;
  res.render("admin/userEdit", {
    message: message,
  });
};
```

Views📁=>admin📁=>common📁=> userEdit.art 👇

```js
<p class="tips">{{message}}</p>
```

### 7. Verify that the current email address to be registered has already been registered·

```js
  // Check if the user exists by email address
  let user = await User.findOne({ email: req.body.email });
  // If the user already exists and the email address is already occupied by someone else
  if (user) {
    // Redirects back to the user add page
    return res.redirect(
      `/admin/userEdit?message=The email address is already occupied`
    );
  }
```

### 8. Encryption of passwords, After verifying that the user input is correct

```js
  // Generate a random string
  const salt = await bcrypt.genSalt(10);
  // Encryption
  const password = await bcrypt.hash(req.body.password, salt);
  // Replace the password
  req.body.password = password;
  //res.send(req.body);
```

### 9. Adding user information to the database

```js
  // Add user information to the database
  await User.create(req.body);
```

### 10. Redirect page to user list page

```js
  // Redirects the page to the user list page
  res.redirect("/admin/user");
```

### 11. Optimization Code

model 📁/`user.js`:

```js
const validateUser = (user) => {}
```

```js
const Joi = require("joi");

// Define the validation rules for the object
const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("Invalid username")),
    email: Joi.string().email().required().error(new Error("Invalid email")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("Invalid Password ")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("Invalid role")),
    state: Joi.number()
      .valid(0, 1)
      .required()
      .error(new Error("Invalid status")),
  };

  // Implementation Validation
  return Joi.validate(user, schema);
};
```

### 12. error handling `res.redirect `middleware

> app.js

```js
// Error handling middleware
app.use((err, req, res, next) => {
  res.redirect(`/admin/userEdit?message=${e.message}`);
});
```

Route📁=>admin📁=>userEdit-fn.js 👇

**JSON.stringfy**

```js
  //Use try{}catch(){} statements to catch exceptions for asynchronous functions
  try {
    await validateUser(req.body);
  } catch (e) {
    // Redirects back to the user add page
		// return res.redirect(`/admin/userEdit?message=${e.message}`);
		// JSON.stringify() Converting object data types to string data types
		return next(JSON.stringify({path: '/admin/userEdit', message: e.message}))
  }

  // Check if the user exists by email address
  let user = await User.findOne({ email: req.body.email });
  if (user) {
   return next(
      JSON.stringify({
        path: "/admin/user-edit",
        message: "The email address is already occupied",
      })
    );
```

 ·`next()`·💥Only one parameter can be passed, and it is a string type, but now if you need to pass two parameters, the solution is 👇:

1. pass an `argument`, the parameters should be written as `object`. 2, 
2. you need to convert `object` to `string` and put it in the `next()` method

3. Here we use `JSON.stringify()` to convert the object data type to `string` data type

```js
return next(JSON.stringify({path: '/admin/userEdit', message: e.message}))
```

app.js

```js
// Error handling middleware
app.use((err, req, res, next) => {
  //JSON.parse()Convert a string to an object
  const result = JSON.parse(err)
  
  res.redirect(`/admin/userEdit?message=${e.message}`);
  //Change to :
  res.redirect(`${result.path}?message=${result.message}`); 
});
```

## 8. Display user infomation 

When accessing the `user list` page, you need to first query all the `user information` from the `database` in the `route` processing function corresponding to the `user list` page, then use the `res.redner` method to render it, and pass the queried user data to the `template` to display it

> router📁->admin.js

```js
// Create a user list route
//this route will be based on the "Level 1 route" -admin "Level 2 route"
admin.get("/user", require("./admin/userList"));
```

> router📁->admin📁->userList.js

```js
// Importing user binding construct functions
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // Query the user information from the database
  //users Accept the returned results
  let users = await User.find({});

  //res.send(users);
  //Render the user list template, and pass the received result users into the template, users is an array
  res.render("admin/user", {
    users: users,
  });
};
```

> Views📁-> user.art

```html
   <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Operation</th>
            </tr>
		</thead>
		<tbody>
           {{each users}}
               <tr>
                    <td>{{$value._id}}</td>
                    <td>{{$value.username}}</td>
                    <td>{{$value.email}}</td>
                    <td>{{$value.role == 'admin' ? 'admin': 'normal'}}</td>
                    <td>{{$value.state == 0 ? 'active': 'disabled'}}</td>
                    <td>  <a href="/admin/userEdit?id={{@$value._id}}" class="glyphicon glyphicon-edit"></a>
                        <i class="glyphicon glyphicon-remove" data-toggle="modal" data-target=".confirm-modal"></i>
                    </td>
                </tr>
     </tbody>
            {{/each}}
</table>
```

## 9. Pagination

When the data in the database is very much, the data needs to be displayed in batches, then you need to use the data paging function.

Paging function core elements.

1. the current page, the user by clicking on the previous page or the next page or page number generated, the client passed to the server through the get parameter way
2. the total number of pages, according to the total number of pages to determine whether the current page is the last page, according to the judgment results to do response operations

> Total number of pages: Math.ceil (total number of data / number of data displayed per page)

### 1. add pagination function

> Router 📁-> admin 📁--> userList.js

```js
 // 1. Receive the current page parameters from the client
  let page = req.query.page || 1 ;
  //2. Number of data items displayed per page
  let pagesize = 10;
  //3. Query the total number of user data
  let count = await User.countDocuments({});
  // res.send("The total number of users is: " + count);
  // return;
  //4. Total number of pages
  let total = Math.ceil(count / pagesize);
```

> Data start query position = (current page - 1) * number of data items displayed per page

```js
limit(2) // limit limit the number of queries pass in the number of data to be displayed per page
skip(1) // skip how much data to skip Pass in the start position of the displayed data
```

```js
  let start = (page - 1) * pagesize;
  // Query the user information from the database
  let users = await User.find({}).limit(pagesize).skip(start);
```

![pageination](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/pageination.png)

### 2. Create Pagination, add a 🔗 link to the pagination button

When rendering the user list template, you need to pass in the paging information as well

> Router 📁-> admin 📁--> userList.js

```js
 res.render("admin/user", {
    users: users,
    page: page,
    total: total,
  });
};
```

> Views📁->  admin📁->user.art

```html
<ul class="pagination">
          <li>
              <a href="/admin/user?page=<%=page-0-1%>">
              <span>&laquo;</span>
            </a>
          </li>
          <%for(var i = 1; i <= total; i++ ){ %>
          <li><a href="/admin/user?page=<%=i %>">{{i}}</a></li>
          <% } %>
          <li>
            <a href="/admin/user?page=<%=page-0+1%>">
              <span>&raquo;</span>
            </a>
          </li>
</ul>
```

 add a 🔗 link to the pagination button

```js
<li><a href="/admin/user?page=<%=i %>">{{i}}</a></li>
```

➡️ button

> The operation in `string` needs to convert page to `number` from `string` "-0" has an implicit conversion function

```js
<a href="/admin/user?page=<%=page-0+1%>">
```

```js
<a href="/admin/user?page=<%=page-0-1%>">           
```

> Determine if the last page has been reached

```js
<li style="display: <%=page-1 < 1 ? 'none' : 'inline' %>">
```

```js
<li style="display: <%= page-0+1 > total ? 'none' : 'inline' %>">
```

> all code

```js
 <ul class="pagination">
                <li style="display: <%=page-1 < 1 ? 'none' : 'inline' %>">
                    <a href="/admin/user?page=<%=page-1%>">
    		        <span>&laquo;</span>
    		      </a>
                </li>
                <% for (var i = 1; i <= total; i++) { %>
                <li><a href="/admin/user?page=<%=i %>">{{i}}</a></li>
                <% } %>
                <li style="display: <%= page-0+1 > total ? 'none' : 'inline' %>">
                    <a href="/admin/user?page=<%=page-0+1%>">
    		        <span>&raquo;</span>
    		      </a>
                </li>
            </ul>
```

## 10.  Edit Userinfo

1. to modify the user ID passed to the server side (role: to distinguish between the function of adding users or modify the user function, if the id has duplicated, is to modify the user information, rather than adding new users)

2. establish the route corresponding to the user information modification function

3. receive the request parameters passed from the client form

4. query the user information according to the id, and the password passed by the client and the password in the database for comparison. 5, 

5. if the comparison fails, respond to the client

6. if the password comparison is successful, update the user information to the database

### 1. pass the user ID to be modified to the server side (role: distinguish between adding user functions or modifying user functions)

> Views📁=>admin📁=>common📁=> user.art

```js
<a href="/admin/userEdit?id={{@$value._id}}" class="glyphicon glyphicon-edit"></a>
```

- Here determine if there is a corresponding id value, 

  If not, it is to add user information, 

  If there is a function to modify the user information

  ![editsuer](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/editsuer.png)

  ![editsuer](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/Screen%20Shot%202023-02-19%20at%2011.01.58%20AM.png)

### 2. Create the route corresponding to the user information modification function

```js
// Introduce a constructor for the user collection
const { User } = require("../../model/user"); // 引入加密模块

module.exports = async (req, res) => {
  //Get the id parameter in the address bar

  const { message, id } = req.query;
  // Add operation
  res.render("admin/userEdit", {
    message: message,
  });

  //If the id parameter is currently passed,
  if (id) {
    //modify the operation
  } else {
    //add operation
  }
};
```

> Click the Modify button to see the user information

![id](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/id.png)

> router📁-> admin📁-> userEdit.js

```js
// Introduce a constructor for the user collection
const { User } = require("../../model/user"); //

module.exports = async (req, res) => {
  //Get the id parameter in the address bar


  const { message, id } = req.query;
  // 添加操作

  //如果當前傳遞了id參數,
  if (id) {
    //修改操作
    let user = await User.findOne({ _id: id });
    //return res.send(user);

    //渲染用戶編輯頁面(修改)
    res.render("admin/userEdit", {
      message: message,
      user: user,
    });
  } else {
    //添加操作
    res.render("admin/userEdit", {
      message: message,
    });
  }
};

```

> Views📁->  admin📁->userEdit.art

![edituseridcompare](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/edituseridcompare.png)

```js
 <form class="form-container" action="{{link}}" method="post">
                <div class="form-group">
                    <label>username</label>
                    <input name="username" type="text" class="form-control" placeholder="Please enter your username" value="{{user && user.username}}">
                </div>
                <div class="form-group">
                    <label>email</label>
                    <input type="email" class="form-control" placeholder="Please enter your email" name="email" value="{{user && user.email}}">
                </div>
                <div class="form-group">
                    <label>password</label>
                    <input type="password" class="form-control" placeholder="Please enter your password" name="password">
                </div>
                <div class="form-group">
                    <label>role</label>
                    <select class="form-control" name="role">
                        <option value="normal" {{user && user.role == 'normal' ? 'selected' : ''}}>noraml</option>
                        <option value="admin" {{user && user.role == 'admin' ? 'selected' : ''}}>admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>state</label>
                    <select class="form-control" name="state">
                        <option value="0" {{user && user.state == '0' ? 'selected' : ''}}>active</option>
                        <option value="1" {{user && user.state == '1' ? 'selected' : ''}}>disabled</option>
                    </select>
                </div>
                <div class="buttons">
                    <input type="submit" class="btn btn-primary" value="submit">
                </div>
            </form>
```

#### 1. user and modify user are two submit addresses, so add `link` attribute in `render`.

```js
    //Render user edit page 
    res.render("admin/userEdit", {
      message: message,
      user: user,
      link:"/admin/user-add"
 
    });
  } else {
    // Add operation
    res.render("admin/userEdit", {
      message: message,
      link:"/admin/userEdit"
    
    });
```

Views📁->  admin📁->userEdit.art

```js
<form class="form-container" action="{{link}}" method="post">
```

#### 2. Add `Button` property : Edit or add

```js
    // Render user edit page (modified)
    res.render("admin/userEdit", {
      message: message,
      user: user,
      link:"/admin/user-add"
      button: "add"
    });
  } else {
 
    res.render("admin/userEdit", {
      message: message,
      link:"/admin/userEdit"
      button: "edit"
    });
```

```js
<div class="buttons">
<input type="submit" class="btn btn-primary" value="{{button}}">
</div>
```

#### 3. show` id` when modifying user page, do not show id when adding user page

Views📁->  admin📁->userEdit.art

```js
<h4 style="display: {{button == '修改' ? 'block' : 'none'}}">{{@user && user._id}}</h4>  
```

💥 Can't let users change password (set separate function elsewhere if you need to change password) Password is used to verify whether users can modify information, password input correctly can modify information, password input wrong, can't modify information

`@`- Original output, minus quotation marks

### 3. receive the request parameters passed by the client form

> router/admin.js

```js
// Implement user information modification function
admin.post("/user-modify", require("./admin/user-modify.js"));
```

> router/admin/userEdit.js

```js
// Introduce a constructor for the user collection
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //Get the id parameter in the address bar

  const { message, id } = req.query;

  //If the id parameter is currently passed, then, it is edit user info
  if (id) {
    let user = await User.findOne({ _id: id });
    //return res.send(user);

 
    res.render("admin/userEdit", {
      message: message,
      user: user,
      link: "/admin/user-modify?id=" + id,
      button: "Edit",
    });
  } else {
 
    res.render("admin/userEdit", {
      message: message,
      link: "/admin/userEdit",
      button: "Add",
    });
  }
};
```

### 4. Query the user information according to the `id` and compare the password passed by the client with the password in the database

> /router/admin/user-modify.js

```js
module.exports = (req, res) => {
  //res.send("ok");
  //接受客戶端傳遞過來的請求參數
  const body = req.body;
  //req.query拿到id, id是即將要修改的用戶的id
  const id = req.query.id;
  //拿到密碼後,需要進行密碼比對
  res.send(body.password);
};
```

> 💥**/router/admin/user-modify.js**

```js
//需要把用戶集合的構造函數,導入
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //res.send("ok");
  //接受客戶端傳遞過來的請求參數
  const body = req.body;
  //req.query拿到id, id是即將要修改的用戶的id
  const id = req.query.id;
  //拿到密碼後,需要進行密碼比對
  //res.send(body.password);

  //調用user集合構造函數下的findOne方法獲取id
  let user = await User.findOne({ _id: id });
  res.send(user);
};
```

![usermodify](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/usermodify.png)

Use the `compare` method under `bcrypt`, this method returns a **boolean** value, the first parameter is the **plaintext** password, the second parameter is the **ciphertext** from the database

```js
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if(isValid){
    res.send("Password Matching Success")
  }else{
    res.send("Password Matching Failure")
  }
```

### 4. If password matching fails, respond to the client - "Cannot make changes to user information" - Trigger app.js error Middleware

> router/admin/user-modify.js

```js
module.exports = async (req, res, next) => {
  
....

//Password Matching Failure 
    let obj = {
      path: "/admin/userEdit",
      message: "password does not match",
      id: id,
    };
    next(JSON.stringify(obj));
  }
```

> app.js

```js
// Error handling middleware
app.use((err, req, res, next) => {
  // res.redirect(`/admin/userEdit?message=${e.message}`);
  const result = JSON.parse(err);
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
      message = result[attr];
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});
```

[passworddoesntmatch.png](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/passworddoesntmatch.png)

### 6.1 if the password comparison is successful, update the user information to the database

```js
   if (isValid) {
    //res.send("Password Matching Success");
    //將用戶信息更新到數據庫中
    await User.updateOne(
      { _id: id },
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        state: req.body.state,
      }
    );
```

Simplify the above code

```js
const {username, email, role, state, password } = req.body;

....

    //Password Matching Success
    if (isValid) {
    //res.send("Password Matching Success");
    //Update the user information to the database
    await User.updateOne(
      { _id: id },
      {
        username: username,
        email: email,
        role: role,
        state: state,
      }
    );

```

```js
    // Redirect the page to the user list page
    res.redirect("/admin/user");
```

## 11. delete userInfo

> 提交刪除請求, 向服務器發送刪除用戶的請求, 並將用戶 id 作為請求參數傳遞到服務器端, "刪除確認彈出框"其實是一個表單, 用表單將ID送到服務器端, 用隱藏域的方式傳遞ID

1. 在确认删除框中添加**隐藏域**用以存储要删除用户的ID值

2. 为**删除按钮**添自定义属性用以存储要删除用户的ID值

3. 为删除按钮添加点击事件，在点击事件处理函数中**获取自定义属性中存储的ID 值**并将ID值存储在表单的隐藏域中

4. 为删除表单添加**提交地址**以及**提交方式**

5. 在服务器端建立“請求地址”*對應*的**删除功能路由**

6. 接收客户端传递过来的**id参数,根据id删除用户**



### 1. In the Confirm deletion box `Add Hidden field` to *store the ID value* of the user to be deleted

> views/admin/user.art

```js
<div class="modal-body">
  <p>Are you sure you want to delete this user??</p>
// This parameter needs to be accepted by id on the server side
  <input type="hidden" name="id">
```

### 2. Find the delete button, need to put the `current user's id` as a custom property on the delete button

> views/admin/user.art

```js
<td>
    <a href="/admin/userEdit?id={{@$value._id}}" class="glyphicon glyphicon-edit delete"></a>
    <i class="glyphicon glyphicon-remove" data-toggle="modal" data-target=".confirm-modal" data-id="{{@$value._id}}"></i>
</td>
```

![delete click](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/delete%20click.png)

![deleteid](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/deleteid.png)

3. Add a `click event` for the delete button, and in the click `event handler` **get the ID value stored in the custom property** and store the ID value in the `hidden field of the form  ![deltes](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/deltes.png)

> views/admin/user.art

```js
//為i 標籤 的class 添加delete
<i class="glyphicon glyphicon-remove delete" data-toggle="modal" data-target=".confirm-modal" data-id="{{@$value._id}}"></i>

...  
//delete 點擊事件  
{{block 'script'}}
    <script type="text/javascript">
        $('.delete').on('click', function () {
            // 获取用户id
      			alert(id);
            var id = $(this).attr('data-id');
            // 将要删除的用户id存储在隐藏域中
            $('#deleteUserId').val(id);
        })
    </script>
{{/block}}
  
...
// 将要删除的用户id存储在隐藏域中
<input type="hidden" name="id" id="deleteUserId">  
```

![delete hidden input](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/delete%20hidden%20input.png)

💥此時可以看到console中已經在隱藏域中獲得了要刪除用戶的id

### 4. add the submit `address` and `method` for the delete form

> views/admin/user.art

```js
<form class="modal-content" action="/admin/delete" method="get">
```

### 5. Create the delete function route corresponding to the "request address" on the server side

> Router/admin.js

```js
//delete user routes
admin.get("/delete", require("./admin/user-delete"));
```

> Router/admin/user-delete.js

```js
module.exports = (req, res) => {
  res.send("ok");
};
```

### 6. receive the **id parameter** passed by the client, and delete user based on id

```js
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  // res.send("ok");
  //獲取要刪除的用戶id
  //res.send(req.query.id); //63f43b554ae2fffe66627db4

  //console.log(id);
  await User.findOneAndDelete({ _id: req.query.id });
  //將用戶重定向到用戶列表頁面
  res.redirect("/admin/user");
};
```

## 12. Article management

### 1. 添加`文章`路由

> articleList router

```js
admin.get("/article", require("/admin/article"));
```

> articleEditrouter

```js
admin.get("/article-edit" , require("/admin/article-edit")) 
```

### 2. 為sidebar的選項添加`href`🔗

> views/admin/common/aside.art

```html
   <ul class="menu list-unstyled">
      <li>
        <a class="item active" href="/admin/user">
          <span class="glyphicon glyphicon-user"></span>
          User Management
        </a>
      </li>
          <li>
            <a class="item" href="/admin/article">
              <span class="glyphicon glyphicon-th-list"></span>
              Article Management
            </a>
      </li>
   </ul>
```

### 3. sidebar的選項切換選中狀態

> router/admin/userEdit.js && router/admin/usrePage.js

```js
 //添加標識: 標識當前訪問的是用戶管理頁面
  // locals方法是可以顯示在模板裡的
  req.app.locals.currentLink = "user";
```

> router/admin/article.js && router/admin/article-edit.js

```js
 //添加標識: 標識當前訪問的是用戶管理頁面
  // locals方法是可以顯示在模板裡的
  req.app.locals.currentLink = "article";
```

⬆️的 “” name 是自定義的

> views/admin/common/aside.art

```js
 <a class="item {{currentLink =="user" ? "active" : ""}}" href="/admin/user">
```

```js
    <a class="item{{currentLink == "article" ? "active" : ""}}" href="/admin/article" >
```

```js
    <ul class="menu list-unstyled">
      <li>
        <a class="item {{currentLink =="user" ? "active" : ""}}" href="/admin/user">
          <span class="glyphicon glyphicon-user"></span>
          User Management
        </a>
      </li>
          <li>
            <a class="item{{currentLink == "article" ? "active" : ""}}" href="/admin/article" >
              <span class="glyphicon glyphicon-th-list"></span>
              Article Management
            </a>
      </li>
</ul>
```

### 4. Create article collection

> 需要在數據庫擁有集合,才可能向集合中添加新的文章

![article-edit](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/article-edit.png)

> model/article.js

```js
// 1. Introduce the mongoose module
const mongoose = require('mongoose');

// 2. Create article collection rules
const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 20,
		minlength: 4,
		required: [true, 'Please enter the title']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please enter the author']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	}
});

// 3. Create collections based on rules

const Article = mongoose.model('Article', articleSchema);

// 4. Export the collection as a module member
module.exports = {
	//Article: Article 
  Article
}
```

### 5. Add link to **`Post a new article** 

> views/admin/article.art

```js
  <a href="/admin/article-edit" class="btn btn-primary new">Post a new article</a
```

此時點擊`Post a new article` button 後, 會跳到 文章編輯頁面 (http://127.0.0.1:3000/admin/article-edit) 

### 6. 給表單添加請求地址以及請求方式(action 屬性和method屬性)

> article-edit.art 

💥Since we are currently **adding data to the database**, the request method is post, and the address is`/admin/article-add`

```js
 <form class="form-container" action="/admin/article-add" method="post">
```

💥並且要給每一個**表單項**添加`name`屬性 , 這是因為**方便服務器接收客戶端傳遞過來的請求參數**, `name`的**屬性的值**最好跟**數據庫中字段**保持一致

可以看到`model/article.js`中, 有title, author, pulishdate, cover, content屬性, 

![artical database](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/artical database.png)

所以要向文件`article-edit.art `裡,每一個表單項添加一樣的名字,對應數據庫裏

```js
    <div class="form-group">
            <label>title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Please enter the article title"
              name="title"
            />
          </div>
          <div class="form-group">
            <label>author</label>
            <input type="text" class="form-control" readonly
            name="author" />
          </div>
          <div class="form-group">
            <label>Release Time</label>
            <input type="date" class="form-control" name="publishDate"/>
          </div>

          <div class="form-group">
            <label for="exampleInputFile">Article Cover</label>
            <input type="file" name="cover" />
            <div class="thumbnail-waper">
              <img class="img-thumbnail" src="" />
            </div>
          </div>
          <div class="form-group">
            <label>Content</label>
        
            <textarea name="content" class="form-control" id="editor"></textarea>
          </div>
```

### 7. File upload form vs. normal form

> The **document upload** form must be in **binary format** 

The enctype attribute serves to: **specify the encoding type of the form data**

Dafault value is 👇: 

```js
application/x-www-form-urlencoded
name=admin&age=20
```

 Encoding form data into binary👇

```js
multipart/form-data 
```

```js
 <form class="form-container" action="/admin/article-add" method="post" enctype="multipart/form-data">
```

![documentupload](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/documentupload.png)

### 8. Implement the route to add articles on the server side

> /router/admin.js

```js
//Implement the route to add articles on the server side
admin.post("/article-add", require("./admin/article-add"));
```

> admin/article-add.js

```js
module.exports = (req, res) => {
  res.send("ok");
};
```

click submit new post -> http://localhost:3000/admin/article-add show ok **means** that the request has entered the route. 

### 9. How do I receive **the binary forms** from the client?

After the previous step is submitted, the request is now routed. 

```js
//Configure the post request parameter, body-parser parsing file
app.use(bodyParser.urlencoded({ extended: false }));
```

> This **bodyParser** above is not enough, to use `formidable`

### 10. Formidable 

> Function: Parse form, support `get` request parameter, `post` request parameter, file upload.

```js
 // Introduce the formidable module
 const formidable = require('formidable');
 // Create a form parsing object, the return value is the form parsing object
 const form = new formidable;
 // Set the corresponding directory/path on the file upload server
 form.uploadDir = "/my/dir";
 // need to keep the extensions of the files uploaded by the form
 form.keepExtensions = false;
 // Parse the form 
 form.parse(req, (err, fields, files) => {
     // fields stores the general request parameters
     // files stores the uploaded file information
 });
```

```js
npm i formidable 
```

> router/admin/article-add.js

```js
const formidable = require("formidable");

module.exports = (req, res) => {
  res.send("ok");
};
```

### 11. Using `formidable` to parse the` request param` passed from the client

> router/admin/article-add.js

1. Create form resolution object

```js
 const form = new formidable.IncomingForm();
```

2. create public/uploads📁
3.  Configure the location of the upload file, using absolute path

```js
const path = require("path");

form.uploadDir = path.join(__dirname, "../","../","public" ,"uploads")
```

3. Keep the **suffix** of the uploaded file (the default is not to keep it)

```js
form.keepExtension = true;
```

4.  parse the form

When the form parse is completed, the callback function **returns 3 parameters.**

- `err` error object If the form fails to be parsed, err stores the error message; if the form is parsed successfully, err will be null
- `fields` object type stores common form data
- `files` object type stores data related to uploaded files

```js
   form.parse(req, async (err, fields, files) => {
       res.send(fields)
    });
```

![form parse](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/form parse.png)

`res.send(field)`

![form parse](/Users/yuimorii/Desktop/Screen Shot 2023-02-22 at 1.51.49 PM.png)

`res.send(files)`

![files](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/files.png)

5. Redirects the page to the article list page

```js
 res.redirect("/admin/article");
```

### 12. Prohibit editing `author` property 

![user disable editing](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/user disable editing.png)

> 💡: The author here should be the currently registered user
>
> In the **article.js** file, the author is the User id stored in the user collection `{User}` , so we need to display this id in this text box. 

After the user has logged in successfully, we store the user information in the `app.locals` object, which is available in the template, by entering `login.js` , 

 ```js
 req.app.locals.userInfo = user;
 ```

 Here we need to get is `userInfo` inside the information template `views/admin/article-edit.art`

 ```js
 <label>author</label>
 <input name="author" type="text" class="form-control" readonly value="{{@userInfo._id}}">
 ```

![userifno](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/userifno.png)

### 13. Upload image  

![image](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/image.png)

Need js to read images 📃, use -> binary file read method -  **FileReader**

```js
 var reader = new FileReader();
 reader.readAsDataURL('file');
 reader.onload = function () {
     console.log(reader.result); 
 }
```

> views/admin/article-edit.art

```js
<input type = "file" name = "cover" id = "file" >
```

```js
    // Select the file upload control
    var file = document.querySelector('#file');
  
    // After the user has selected the file
    file.onchange = function () {
        // 1.  Create a file reader object
        var reader = new FileReader();
        // List of files selected by the user 
        console.log(this.files[0])
        // 2.  Read files this.file represents the list of files selected by the user
        reader.readAsDataURL(this.files[0]);
     }
```

![fileread](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/fileread.png)

###  14. upload multiple image

```js
<input type="file" name="cover" id="file" multiple>
```

### 15. Pass the selected file to the `readAsDataURL(this.files[0]) ` method

> Since this file is an async method, cant get result throught` return` method, so using `onload` method

```js
reader.onload = function () {
    console.log(reader.result)
}
```

![onload](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/onload.png)

The src of the image can be displayed in the console now 

### 16. image preview 

```js
  <div class="thumbnail-waper">
     <img class="img-thumbnail" src="" id="preview">
  </div>       
```

```js
reader.onload = function () {
    console.log(reader.result)
    // Display the result of the file reading on the page
    preview.src = reader.result;
}
```

> The preview image function was successful🚀  

![imagepreview](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/imagepreview.png)

### 17. Place the `articles`( passed from the client to the server ) into `database`



