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

### 1. 为用户列表页面的新增用户按钮添加链接

- Views📁=>admin📁=>common📁=> user.art

  ```js
   <a href="/admin/user-edit" class="btn btn-primary new">New Users</a> 
  ```

### 2. 添加一个连接对应的路由，在路由处理函数中渲染新增用户模板

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

打开浏览器刷新，点击新增用户，发现：可以跳转到表单页了。![Screen Shot 2023-02-19 at 9.18.08 AM](/Users/yuimorii/Documents/GitHub/Tokyo-stack-projects/images/user-edit-fomr.png)

### 3. 为新增用户表单指定请求地址、请求方式、为表单项添加name属性

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

### 4. 創建实现添加用户的功能路由(點擊submit後的post 操作)

> Router📁=>admin📁=> userEdit-fn.js

```js
// 创建实现添加用户功能
admin.post('/user-Edit', require('./admin/userEdit-fn'));

module.exports = (req, res) => {
  //這裡實現用戶添加功能
  res.send("ok");
};
```

回到浏览器刷新表单页面，点击提交按钮，可以看到：瀏覽器頁面顯示ok,说明路由创建成功了。

### 5. 接收到客户端传递过来的请求参数

继续编辑 user-edit-fn.js 文件：

```js
module.exports = (req, res) => {
  //這裡實現用戶添加功能
  res.send(req.body);
};
//刷新浏览器，随便输入一些信息，点击提交。可以看到：接收到的请求参数
//{"username":"matthew","email":"matthew@gmail.com","password":"000000","state":"0"}
```

### 6. 对请求参数的格式进行验证(😤)

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
> //引入joi模块
> const Joi=require('joi')
> 
> module.exports=async(req,res)=>{
> 
>   //定義對象的驗證規則
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
  //這裡實現用戶添加功能
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
  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    //实施验证
    await schema.validateAsync(req.body);
  } catch (e) {
    //验证没有通过
    console.log(e.message)
    //重定向回用户添加页面
    return res.redirect(`/admin/userEdit?message = ${e.message}`);
  }
  //這裡如果在最後寫了res.send(req.body) 會報錯, 可以在res.direct 前➕return 讓下面代碼不執行
  // res.send(req.body);
};
```

> Note: 👆上面try...catch 的思路是: 

💡在/admin/userEdit-fn中, 當用戶點擊提交的按鈕, 頁面就會跳轉, 實際上是跳轉到`/admin/userEdit`頁面, 所以在user.Edit中渲染`res.render`, 就可以在art文件中出現這個message 了 



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

### 8. Encryption of passwords, 在驗證用戶輸入無誤後

```js
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  //res.send(req.body);
```

### 9. Adding user information to the database

```js
  // 将用户信息添加到数据库中
  await User.create(req.body);
```

### 10. Redirect page to user list page

```js
  // 将页面重定向到用户列表页面
  res.redirect("/admin/user");
```

### 11. 優化代碼

在model 📁下`user.js`中 

```js
const validateUser = (user) => {}
```

```js
const Joi = require("joi");

// 定义对象的验证规则
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

  // 实施验证
  return Joi.validate(user, schema);
};
```

### 12. error handling `res.redirect `middleware

> app.js

```js
//錯誤處理中間件
app.use((err, req, res, next) => {
  res.redirect(`/admin/userEdit?message=${e.message}`);
});
```

Route📁=>admin📁=>userEdit-fn.js 👇

**JSON.stringfy**

```js
  //用try{}catch(){}语句来捕获异步函数的异常
  try {
    await validateUser(req.body);
  } catch (e) {
    // 重定向回用户添加页面
		// return res.redirect(`/admin/userEdit?message=${e.message}`);
		// JSON.stringify() 将对象数据类型转换为字符串数据类型
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

 ·`next方法`·💥Only one parameter can be passed, and it is a string type, but now if you need to pass two parameters, the solution is 👇:

1. pass an `argument`, the parameters should be written as `object`. 2, 
2. you need to convert `object` to `string` and put it in the `next()` method

3. Here we use `JSON.stringify()` to convert the object data type to `string` data type

```js
return next(JSON.stringify({path: '/admin/userEdit', message: e.message}))
```

app.js

```js
//錯誤處理中間件
app.use((err, req, res, next) => {
  //JSON.parse()將字符串轉換為對象
  const result = JSON.parse(err)
  
  將原🈶️的
  res.redirect(`/admin/userEdit?message=${e.message}`);
  改為:
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
//導入用戶結合構造函數
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // Query the user information from the database
  //users 接受返回的結果
  let users = await User.find({});

  //res.send(users);
  //渲染用戶列表模板, 將接收到的結果users傳入模板中, users是數組
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
  let page = req.query.page;
  //2. Number of data items displayed per page
  let pagesize = 10;
  //3. Query the total number of user data
  let count = await User.countDocuments({});
  // res.send("The total number of users is: " + count);
  // return;
  //4. Total number of pages
  let total = Math.ceil(count / pagesize);
```

> 数据开始查询位置=（当前页-1）* 每页显示的数据条数

```js
limit(2) // limit 限制查询数量  传入每页显示的数据数量
skip(1) // skip 跳过多少条数据  传入显示数据的开始位置
```

```js
  let start = (page - 1) * pagesize;
  // Query the user information from the database
  let users = await User.find({}).limit(pagesize).skip(start);
```

![pageination](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/pageination.png)

### 2. 生成分頁器, add a 🔗 link to the pagination button

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

> Views📁-> user.art

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

> 這裡的運算需要將page從`string`轉換為`number` "-0"有隱式轉換功能

```js
<a href="/admin/user?page=<%=page-0+1%>">
```

```js
<a href="/admin/user?page=<%=page-0-1%>">           
```

判斷是否到達最後一頁

```js
<li style="display: <%=page-1 < 1 ? 'none' : 'inline' %>">
```

```js
<li style="display: <%= page-0+1 > total ? 'none' : 'inline' %>">
```

all code

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

## 10. Userinfo edit

1. 将要修改的用户ID传递到服务器端（作用：区分添加用户功能还是修改用户功能）

2. 建立用户信息修改功能对应的路由

3. 接收客户端表单传递过来的请求参数

4. 根据id查询用户信息，并将客户端传递过来的密码和数据库中的密码进行比对, 

5. 如果比对失败，对客户端做出响应

6. 如果密码对比成功，将用户信息更新到数据库中

### 1. 将要修改的用户ID传递到服务器端（作用：区分添加用户功能还是修改用户功能）

> 在用戶列表頁面裡 Views📁=>admin📁=>common📁=> user.art

```js
<a href="/admin/userEdit?id={{@$value._id}}" class="glyphicon glyphicon-edit"></a>
```

- Here determine if there is a corresponding id value, 

  If not, it is to add user information, 

  If there is a function to modify the user information

  ![editsuer](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/editsuer.png)

  ![editsuer](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/Screen%20Shot%202023-02-19%20at%2011.01.58%20AM.png)

### 2. 建立用户信息修改功能对应的路由

```js
// 引入用户集合的构造函数
const { User } = require("../../model/user"); // 引入加密模块

module.exports = async (req, res) => {
  //獲取到地址欄中的id參數

  const { message, id } = req.query;
  // 添加操作
  res.render("admin/userEdit", {
    message: message,
  });

  //如果當前傳遞了id參數,
  if (id) {
    //修改操作
  } else {
    //添加操作
  }
};
```

> Click the Modify button to see the user information

![id](https://github.com/itsyuimorii/Tokyo-stack-projects/blob/main/images/id.png)

### 3. 接收客户端表单传递过来的请求参数

> router📁-> admin📁-> userEdit.js

```js

```



### 

### 4. 根据id查询用户信息，并将客户端传递过来的密码和数据库中的密码进行比对, 

### 5. 如果比对失败，对客户端做出响应

### 6. 如果密码对比成功，将用户信息更新到数据库中

## Takeaway key points

