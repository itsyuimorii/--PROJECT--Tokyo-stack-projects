# 💥 Project Learning notes

# ⛳️1. Initialization

### 1.1 Create project

1. Create a new api_server folder as the project root, and run the following command in the project root to initialize the package management configuration file.

```bash
npm init -y
```

2. 特定のバージョンのexpressをインストールする場合は、以下のコマンドを実行します。

```bash
inpm i express@4.17.1
```

3. Create a new `app.js` in the project root directory as the entry file for the entire project and initialize the following code.

```js
//////////////////// import the required modules 👇
// Import the express module
const express = require('express')
// Create a server instance of express
const app = express()

// write your code here...

// Call the app.listen method, specify the port number and start the web server
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
```

### 1.2 Configuring cors 

1. Run the following command to install the `cors` middleware.

```bash
npm i cors@2.8.5
```

2. Import and configure the`cors` middleware in app.js.

```js
// Importing cors middleware
const cors = require('cors')
// Register cors as global middleware
app.use(cors())
```

### 1.3 Configure middleware for parsing form data

1. The middleware for parsing form data in `application/x-www-form-urlencoded`format is configured with the following code.

```js
//////////////////// configures the middleware for parsing form data 👇
app.use(express.urlencoded({ extended: false }))
```

### 1.4 Initializing routing-related folders

1. In the project root directory, create a new *router folder* to store all the routing modules
   
   > In the routing module, only the mapping between the client's request and the processing function is stored
2. In the project root directory, create a new *router_handler* folder to store all the `router` handler modules
   
   > The route handler module is dedicated to holding the corresponding handler functions for each route

### 1.5 Initialize user routing module

1. In the `router` folder, create a new `user.js` file, ** as a routing module for the user, and initialize the code** as follows.

```js
const express = require('express')
 
// Create a routing object, using the constant router to receive
const router = express.Router()


/////////////////////////////////
/* Mount two routes, listen to client requests */
// Register new users
router.post('/regUser', (req, res) => {
  res.send('reguser OK')
})

// Login
router.post('/login', (req, res) => {
  res.send('login OK')
})

// Share the routing object, and then import and use the user module in app.js
module.exports = router
```

2. In `app.js`, import and use the `User Routing Module`.

```js
//////////////////// import and register the userRouter module 👇
const userRouter = require('. /router/user')
/* Register as a routing module with app.use, /api means that each module inside userRouter must be prefixed with /api when accessed */
app.use('/api', userRouter)
```

### 1.6 Abstraction of processing functions in the user routing module

> > Purpose: To ensure the purity of the `Route module`, all `Route handler functions` must be abstracted to the corresponding `Route handler module`.
>
> 1. In `/router_handler/user.js, use the exports object to share the following two routing functions with the outside.

```js
/**
 * Define user-related route handling functions here for the /router/user.js module to call
 */

// Handler function for registered users
exports.regUser = (req, res) => {
  res.send('reguser OK')
}

// Login processing function
exports.login = (req, res) => {
  res.send('login OK')
}
```

2. Change the code in /router/user.js to the following structure.

```js
const express = require('express')
const router = express.Router()

// Import User Route Handler Module
const userHandler = require('../router_handler/user')

/* ❌router.post("/regUser", (req, res) => {
  res.send("request successfully");
}); */
// Modify the above code to 👇, abstracting out the handler function in the user routing module

// Register a new user
router.post('/regUser', userHandler.regUser)
// Login
router.post('/login', userHandler.login)

module.exports = router
```

# ⛳️2. Login and Registration

### 2.1 Create a new ev_users table

1. In the `my_db_01` database, create a new ev_users table as follows.
   ```sql
   CREATE TABLE `blog_db_2023`.`ev_users` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `username` VARCHAR(255) NOT NULL,
     `password` VARCHAR(255) NOT NULL,
     `nickname` VARCHAR(255) NULL,
     `email` VARCHAR(255) NULL,
     `user_pic` VARCHAR(255) NULL COMMENT 'User information table',
     PRIMARY KEY (`id`),
     UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
     UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);
   
   ```

### 2.2 Install and configure the mysql module

> In the API interface project, you need to install and configure `mysql`, a third-party module to connect and manipulate MySQL databases

1. Run the following command to install the `mysql` module.

```bash
npm i mysql@2.18.1
```

2. Create a new `/db/index.js` file in the root of the project and create the database connection object in this custom module.

```js
// 1. import mysql module
const mysql = require('mysql')

// 2. Create a connection to the MySQL database ~
const db = mysql.createPool({
  host: "127.0.0.1", // IP address of the database
  user: "root", // account to login to the database
  password: "yuimorii", // password to log in to the database
  database: "blog_db_2023", // specify which database to operate
});


// Share the db database connection object externally
module.exports = db
```

### 2.3 Registration

#### 2.3.0 Implementation steps

1. detect whether the form data is legal
2. detect whether the user name is occupied
3. encrypt the password
4. insert new user

#### 2.3.1 Detecting the legality of form data

1. Determine if the username and password are empty

```js
// Receive form data
const userinfo = req.body
// Determine if the data is legitimate
if (!userinfo.username || !userinfo.password) {
  return res.send({ status: 1, message: 'Username or password cannot be empty! })
}
```

#### 2.3.2 Detecting whether the user name is occupied

1. Importing database operation modules.

```js
const db = require('../db/index')
```

2. Define the SQL statement.

```js
const sql = `select * from ev_users where username=?`
```

3. Execute the SQL statement and determine if the user name is occupied based on the result.

```js
db.query(sql, [userinfo.username], function (err, results) {
  // Failed to execute SQL statement
  if (err) {
    return res.send({ status: 1, message: err.message })
  }
  // Username is occupied
  if (results.length > 0) {
    return res.send({ status: 1, message: 'Username is taken, please change to another username! })
  }
  // TODO: Username available, continue the process...
})
```

In the db, add username: admin password: 000000

```sql
UPDATE `blog_db_2023`.`ev_users` SET `username` = 'admin' WHERE (`id` = '1');

```



> 2.3.3 Encryption of passwords In order to ensure the security of passwords, it is not recommended to store user passwords in the form of `plaintext` in the database, it is recommended to `encrypted storage` of passwords

---

In the current project, user passwords are encrypted using `bcryptjs`, with the following advantages.

- The encrypted password cannot be cracked in reverse.
- The same plaintext password is encrypted multiple times, and the encryption results are different, ensuring security.

---

1. Run the following command to install the specified version of bcryptjs.

```bash
npm i bcryptjs@2.4.3
```

2. In `/router_handler/user.js`, import bcryptjs

```js
const bcrypt = require('bcryptjs')
```

3. After confirming the availability of the username in the user registration handler, the `bcrypt.hashSync`(plaintext password, length of random salt) method is called to encrypt the user's password.

```js
// Encrypt the user's password with bcrype, the return value is the encrypted password string
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```

#### 2.3.4 Insert new user

1. Define the SQL statement that inserts the user.

```js
const sql = 'insert into ev_users set ?'
```

2. Call `db.query()` to execute the SQL statement that inserts the new user.

```js
db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
  // Failed to execute SQL statement
  if (err) returns res.send({ status: 1, message: err.message })
  // execution of the SQL statement succeeds, but the number of rows affected is not 1
  if (results.affectedRows ! == 1) {
    return res.send({ status: 1, message: 'Failed to register user, please try again later! })
  }
  // Registration was successful
  res.send({ status: 0, message: 'Registration was successful! })
})
```

### 2.4 Optimizing the res.send() code

> In the processing function, you need to call `res.send()` several times to respond to the client with the result of `processing failure`, in order to simplify the code, you can manually encapsulate a res.encap() function

1. In `app.js`, before all routes, declare a global middleware that mounts a `res.encap()` function for the res object.

```js
// Middleware for response data
app.use(function (req, res, next) {
  // status = 0 for success; status = 1 for failure; set status to 1 by default to handle failure cases
  res.encap = function (err, status = 1) {
    res.send({
      // status
      status,
      // status description, determine if err is an error object or a string
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
```

### 2.5 [Optimize form data validation](https://www.npmjs.com/package/express-joi-validation?activeTab=readme#validatorparamsschema-options)

> The principle of form validation: front-end validation is complementary, back-end validation is primary, and the back-end should never trust any content submitted by the front-end

In actual development, both front and back ends need to verify the legality of the form data, and the back end plays a crucial role in intercepting illegal data as the last gate of data legality verification.

### #joi official case

> Installation

```js
npm install @escook/express-joi
```

>  Dependency

```js
npm install joi@17.4.0
```

> Import

```js
const expressJoi = require('@escook/express-joi')
```

> Use (in development, userSchema is written in a separate schema file that contains validation rules and then exported)

```js
const express = require('express')
const app = express()
// Import Joi to define validation rules
const Joi = require('joi')
// 1. import @escook/express-joi
const expressJoi = require('@escook/express-joi')

// Parse the form data in x-www-form-urlencoded format
app.use(express.urlencoded({ extended: false }))

// 2. Define the validation rule object userSchema
// Note: If the client submits some parameter items that are not defined in the schema
// In this case, these extra parameter items will be ignored by default
const userSchema = {
  // 2.1 Validate the data in req.body (form)
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/) //.pattern can define regular expressions
      .required(),
    repassword: Joi.ref('password')
  },
  // 2.2 Verify the data in req.query()
  query: {
    name: Joi.string().alphanum().min(3).required(),
    age: Joi.number().integer().min(1).max(100).required()
  },
  // 2.3 Validate the data in req.params (the data in the URL)
  params: {
    id: Joi.number().integer().min(0).required()
  }
}

// 3. Call the middleware for parameter validation by expressJoi(userSchema) in the route
// (partial middleware) =>
app.post('/adduser/:id', expressJoi(userSchema), function (req, res) {
  const body = req.body
  res.send(body)
})

// 4.1 Error-level middleware
app.use(function (err, req, res, next) {
  // 4.1 Joi parameter validation failure
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }
  // 4.2 Unknown error
  res.send({
    status: 1,
    message: err.message
  })
})
 
```
Implementation Defining Validation Rules For more validation rules, please refer to the official documentation of [Joi](https://joi.dev/).
> Simply using `if... .else... ` is inefficient, has a high error rate, and is poorly maintained. Therefore, it is recommended to use **third-party data validation modules** to reduce the error rate, improve the efficiency and maintainability of validation, and **let back-end programmers focus more on the processing of core business logic**.

### Optimize form data validation CODE

1. Install the `@hapi/joi` package and define validation rules for each data item carried in the form.

```bash
npm install @hapi/joi@17.1.0
```

2. Install the `@escook/express-joi` middleware to automate the validation of form data.

```bash
npm i @escook/express-joi
```

3. Create a new `/schema/user.js` user information validation rules module and initialize the code as follows.

```js
const joi = require('@hapi/joi')

/**
 * string() value must be a string
 * alphanum() value can only be a string containing a-zA-Z0-9
 * min(length) minimum length
 * max(length) Maximum length
 * required() value is required and cannot be undefined
 * pattern(regular expression) values must conform to the rules of regular expressions
 */

// Username validation rules
const username = joi.string().alphanum().min(1).max(10).required()
// Password validation rules
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// Validation rule object for registration and login forms
exports.reg_login_schema = {
  // indicates that the data in req.body needs to be validated
  body: {
    username,
    password,
  },
}
```

4. Modify the code in `/router/user.js` as follows.
   
   > 🌟 If the server's registration form data is validated against the validation rule object defined  in the schema just now

```js
/* TODO: The router folder is dedicated to all routing modules. The routing module,
  value holds the mapping between interoperable requests and handler functions; */

//👇user.js is used as the user's routing module, and initialized with the following code 👇

//import express
const express = require("express");
// Create the routing object, using the constant router to receive it
const router = express;
//import the user route handler module
const user_handler = require("... /router_handler/user");

//1. import the middleware for validating form data
const expressJoi = require("@escook/express-joi");
//2. import the rule object to be validated
const { reg_login_schema } = require(". /schema/user");

//////////////////////// mounts two routes and listens to the client's requests

// 3. In the route for registering a new user, declare a local middleware that validates the data carried in the current request
// 3.1 If the data validation passes, the request will be forwarded to a later routing function
// 3.2 If the data validation fails, the execution of the subsequent code is terminated and a global Error error is thrown into the global error level middleware for processing

// Register a new user
router.post("/reguser", expressJoi(reg_login_schema), user_handler.regUser);
//login
router.post("/login", user_handler.login);

//expose it, then import and use the user module in app.js
module.exports = router;

```

5. In the global error level middleware of `app.js`, catch the validation failure error and respond to the client with the result of the validation failure.

```js
// Define error-level middleware
app.use((err, req, res, next) => {
  // Error due to validation failure
  if (err instanceof joi.ValidationError) return res.encap(err);
  // error after authentication failure
  if (err.name === "UnauthorizedError") return res.encap("Authentication failed!") ;
  // Unknown error
  res.encap(err);
});
```

### Reported error @hapi/joi third party package not available

If an error is reported @hapi/joi third-party package is not available, you need to download another version; use the third-party package @hapi/joi to define [form](https://so.csdn.net/so/search?q=表单&spm=1001.2101.3001.7020) validation rules, then use postman to detect the Return error as`Cannot mix different versions of joi schemas`

Solution: Run the following command to reinstall the third-party package

```javascript
npm i joi
```

Change the imported @hapi/joi to joi

```javascript
change
const joi = require("@hapi/joi")
to：
const joi = require("joi")
 
```

### 2.6 Login

#### 2.6.0 Implementation steps

1. Check whether the form data is legitimate or not
1. Query user data based on user name
1. Determine if the password entered by the user is correct
1. Generate Token string for JWT

#### 2.6.1 检测登录表单的数据是否合法

1. 将 `/router/user.js` 中 `登录` 的路由代码修改如下：

```js
// 登录的路由
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
```

#### 2.6.2 根据用户名查询用户的数据

1. 接收表单数据：

```js
const userinfo = req.body
```

2. 定义 SQL 语句：

```js
const sql = `select * from ev_users where username=?`
```

3. 执行 SQL 语句，查询用户的数据：

```js
db.query(sql, userinfo.username, function (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)
  // 执行 SQL 语句成功，但是查询到数据条数不等于 1
  if (results.length !== 1) return res.encap('登录失败！')
  // TODO：判断用户输入的登录密码是否和数据库中的密码一致
})
```

#### 2.6.3 判断用户输入的密码是否正确

> 核心实现思路：调用 `bcrypt.compareSync(用户提交的密码, 数据库中的密码)` 方法比较密码是否一致

> 返回值是布尔值（true 一致、false 不一致）

具体的实现代码如下：

```js
// 拿着用户输入的密码,和数据库中存储的密码进行对比
const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

// 如果对比的结果等于 false, 则证明用户输入的密码错误
if (!compareResult) {
  return res.encap('登录失败！')
}

// TODO：登录成功，生成 Token 字符串
```

#### 2.6.4 生成 JWT 的 Token 字符串

> 核心注意点：在生成 Token 字符串的时候，一定要剔除 **密码** 和 **头像** 的值

1. 通过 ES6 的高级语法，快速剔除 `密码` 和 `头像` 的值：

```js
// 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
const user = { ...results[0], password: '', user_pic: '' }
```

2. 运行如下的命令，安装生成 Token 字符串的包：

```bash
npm i jsonwebtoken@8.5.1
```

3. 在 `/router_handler/user.js` 模块的头部区域，导入 `jsonwebtoken` 包：

```js
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
```

4. 创建 `config.js` 文件，并向外共享 **加密** 和 **还原** Token 的 `jwtSecretKey` 字符串：

```js
module.exports = {
  jwtSecretKey: 'itheima No1. ^_^',
}
```

5. 将用户信息对象加密成 Token 字符串：

```js
// 导入配置文件
const config = require('../config')

// 生成 Token 字符串
const tokenStr = jwt.sign(user, config.jwtSecretKey, {
  expiresIn: '10h', // token 有效期为 10 个小时
})
```

6. 将生成的 Token 字符串响应给客户端：

```js
res.send({
  status: 0,
  message: '登录成功！',
  // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
  token: 'Bearer ' + tokenStr,
})
```

### 2.7 配置解析 Token 的中间件

> 使用场景: 因为服务器端已经配置生成token的过程, 但是以后当客户端启动一些有权限接口的时候是需要身份🆔认证的, 那么这个时候,就需要把用户信息从token还原回来 

1. 运行如下的命令，安装解析 Token 的中间件：

```js
npm i express-jwt@5.3.3
```

2. 在 `app.js` 中注册路由之前，配置解析 Token 的中间件：

```js
 // 导入配置文件
const { expressjwt } = require("express-jwt");

// 解析 token 的中间件
const config = require("./config");

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api/],
  })
);

```

3. 在 `app.js` 中的 `错误级别中间件` 里面，捕获并处理 Token 认证失败后的错误：

```js
// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.encap('身份认证失败！')

  // 未知错误...
})
```

# ⛳️3. 个人中心

### 3.1 获取用户的基本信息

#### 3.1.0 实现步骤

1. 初始化 **路由** 模块
2. 初始化 **路由处理函数** 模块
3. 获取用户的基本信息

#### 3.1.1 初始化路由模块

1. 创建 `/router/userinfo.js` 路由模块，并初始化如下的代码结构：

```js
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```

2. 在 `app.js` 中导入并使用个人中心的路由模块：

```js
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
```

#### 3.1.2 初始化路由处理函数模块

1. 创建 `/router_handler/userinfo.js` 路由处理函数模块，并初始化如下的代码结构：

```js
// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  res.send('ok')
}
```

2. 修改 `/router/userinfo.js` 中的代码如下：

```js
const express = require('express')
const router = express.Router()

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router
```

#### 3.1.3 获取用户的基本信息

1. 在 `/router_handler/userinfo.js` 头部导入数据库操作模块：

```js
//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  //导入数据库模块
  const db = require("../db/index");
```

2. 定义 SQL 语句：

```js

  // 定义查询用户信息的sql语句
  // 根据用户的 id，查询用户的基本信息
  // 注意：为了防止用户的密码泄露，需要排除 password 字段
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
```

3. 调用 `db.query()` 执行 SQL 语句：

```js
  //调用db.query执行sql 语句
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.auth.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.encap(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.encap("获取用户信息失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results[0],
    });
  });
  //   res.send("ok");
};

```

### 3.2 更新用户的基本信息

#### 3.2.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 实现更新用户基本信息的功能

#### 3.2.1 定义路由和处理函数

1. 在 `/router/userinfo.js` 模块中，新增 `更新用户基本信息` 的路由：

```js
// 更新用户的基本信息
router.post('/userinfo', userinfo_handler.updateUserInfo)
```

2. 在 `/router_handler/userinfo.js` 模块中，定义并向外共享 `更新用户基本信息` 的路由处理函数：

```js
// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  res.send('ok')
}
```

#### 3.2.2 验证表单数据

> 使用场景: 对用户提交的数据“合法性”进行验证

1. 在 `/schema/user.js` 验证规则模块中，定义 `id`，`nickname`，`email` 的验证规则如下：

```js
// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
```

2. 并使用 `exports` 向外共享如下的 `验证规则对象`：

   > 只有一个body属性 

```js
// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
}
```

3. 在 `/router/userinfo.js` 模块中，导入验证数据合法性的中间件：

```js
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
```

4. 在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：

```js
// 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')
```

5. 在 `/router/userinfo.js` 模块中，修改 `更新用户的基本信息` 的路由如下：

```js
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
```

#### 3.2.3 实现更新用户基本信息的功能

1. 定义待执行的 SQL 语句：

```js
const sql = `update ev_users set ? where id=?`
```

2. 调用 `db.query()` 执行 SQL 语句并传参：

```js
db.query(sql, [req.body, req.body.id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 执行 SQL 语句成功，但影响行数不为 1
  if (results.affectedRows !== 1) return res.encap('修改用户基本信息失败！')

  // 修改用户信息成功
  return res.encap('修改用户基本信息成功！', 0)
})
```

### 3.3 重置密码

#### 3.3.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 实现重置密码的功能

#### 3.3.1 定义路由和处理函数

1. 在 `/router/userinfo.js` 模块中，新增 `重置密码` 的路由：

```js
// 重置密码的路由
router.post('/updatepwd', userinfo_handler.updatePassword)
```

2. 在 `/router_handler/userinfo.js` 模块中，定义并向外共享 `重置密码` 的路由处理函数：

```js
// 重置密码的处理函数
exports.updatePassword = (req, res) => {
  res.send('ok')
}
```

#### 3.3.2 验证表单数据

> 核心验证思路：旧密码与新密码，必须符合密码的验证规则，并且新密码不能与旧密码一致！

1. 在 `/schema/user.js` 模块中，使用 `exports` 向外共享如下的 `验证规则对象`：

```js
// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
```

2. 在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：

```js
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema } = require('../schema/user')
```

3. 并在 `重置密码的路由` 中，使用 `update_password_schema` 规则验证表单的数据，示例代码如下：

```js
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
```

#### 3.3.3 实现重置密码的功能

1. 根据 `id` 查询用户是否存在：

```js
// 定义根据 id 查询用户数据的 SQL 语句
const sql = `select * from ev_users where id=?`

// 执行 SQL 语句查询用户是否存在
db.query(sql, req.user.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 检查指定 id 的用户是否存在
  if (results.length !== 1) return res.encap('用户不存在！')

  // TODO：判断提交的旧密码是否正确
})
```

2. 判断提交的 **旧密码** 是否正确：

```js
// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')

// 判断提交的旧密码是否正确
const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
if (!compareResult) return res.encap('原密码错误！')
```

3. 对新密码进行 `bcrypt` 加密之后，更新到数据库中：

```js
// 定义更新用户密码的 SQL 语句
const sql = `update ev_users set password=? where id=?`

// 对新密码进行 bcrypt 加密处理
const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

// 执行 SQL 语句，根据 id 更新用户的密码
db.query(sql, [newPwd, req.user.id], (err, results) => {
  // SQL 语句执行失败
  if (err) return res.encap(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('更新密码失败！')

  // 更新密码成功
  res.encap('更新密码成功！', 0)
})
```

### 3.4 更新用户头像

#### 3.4.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 实现更新用户头像的功能

#### 3.4.1 定义路由和处理函数

1. 在 `/router/userinfo.js` 模块中，新增 `更新用户头像` 的路由：

```js
// 更新用户头像的路由
router.post('/update/avatar', userinfo_handler.updateAvatar)
```

2. 在 `/router_handler/userinfo.js` 模块中，定义并向外共享 `更新用户头像` 的路由处理函数：

```js
// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  res.send('ok')
}
```

#### 3.4.2 验证表单数据

1. 在 `/schema/user.js` 验证规则模块中，定义 `avatar` 的验证规则如下：

```js
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
```

2. 并使用 `exports` 向外共享如下的 `验证规则对象`：

```js
// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
}
```

3. 在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：

```js
const { update_avatar_schema } = require('../schema/user')
```

4. 在 `/router/userinfo.js` 模块中，修改 `更新用户头像` 的路由如下：

```js
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
```

#### 3.4.3 实现更新用户头像的功能

1. 定义更新用户头像的 SQL 语句：

```js
const sql = 'update ev_users set user_pic=? where id=?'
```

2. 调用 `db.query()` 执行 SQL 语句，更新对应用户的头像：

```js
db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('更新头像失败！')

  // 更新用户头像成功
  return res.encap('更新头像成功！', 0)
})
```

## 4. 文章分类管理

### 4.1 新建 ev_article_cate 表

#### 4.1.1 创建表结构

![文章分类表结构](./images/2.jpg)

#### 4.1.2 新增两条初始数据

![文章分类表结构](./images/3.jpg)

### 4.2 获取文章分类列表

#### 4.2.0 实现步骤

1. 初始化路由模块
2. 初始化路由处理函数模块
3. 获取文章分类列表数据

#### 4.2.1 初始化路由模块

1. 创建 `/router/artcate.js` 路由模块，并初始化如下的代码结构：

```js
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取文章分类的列表数据
router.get('/cates', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```

2. 在 `app.js` 中导入并使用文章分类的路由模块：

```js
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)
```

#### 4.2.2 初始化路由处理函数模块

1. 创建 `/router_handler/artcate.js` 路由处理函数模块，并初始化如下的代码结构：

```js
// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  res.send('ok')
}
```

2. 修改 `/router/artcate.js` 中的代码如下：

```js
const express = require('express')
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

module.exports = router
```

#### 4.2.3 获取文章分类列表数据

1. 在 `/router_handler/artcate.js` 头部导入数据库操作模块：

```js
// 导入数据库操作模块
const db = require('../db/index')
```

2. 定义 SQL 语句：

```js
// 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
```

3. 调用 `db.query()` 执行 SQL 语句：

```js
db.query(sql, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 2. 执行 SQL 语句成功
  res.send({
    status: 0,
    message: '获取文章分类列表成功！',
    data: results,
  })
})
```

### 4.3 新增文章分类

#### 4.3.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 查询 `分类名称` 与 `分类别名` 是否被占用
4. 实现新增文章分类的功能

#### 4.3.1 定义路由和处理函数

1. 在 `/router/artcate.js` 模块中，添加 `新增文章分类` 的路由：

```js
// 新增文章分类的路由
router.post('/addcates', artcate_handler.addArticleCates)
```

2. 在 `/router_handler/artcate.js` 模块中，定义并向外共享 `新增文章分类` 的路由处理函数：

```js
// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  res.send('ok')
}
```

#### 4.3.2 验证表单数据

1. 创建 `/schema/artcate.js` 文章分类数据验证模块，并定义如下的验证规则：

```js
// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}
```

2. 在 `/router/artcate.js` 模块中，使用 `add_cate_schema` 对数据进行验证：

```js
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema } = require('../schema/artcate')

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
```

#### 4.3.3 查询分类名称与别名是否被占用

1. 定义查重的 SQL 语句：

```js
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where name=? or alias=?`
```

2. 调用 `db.query()` 执行查重的操作：

```js
// 执行查重操作
db.query(sql, [req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 判断 分类名称 和 分类别名 是否被占用
  if (results.length === 2) return res.encap('分类名称与别名被占用，请更换后重试！')
  // 分别判断 分类名称 和 分类别名 是否被占用
  if (results.length === 1 && results[0].name === req.body.name) return res.encap('分类名称被占用，请更换后重试！')
  if (results.length === 1 && results[0].alias === req.body.alias) return res.encap('分类别名被占用，请更换后重试！')

  // TODO：新增文章分类
})
```

#### 4.3.4 实现新增文章分类的功能

1. 定义新增文章分类的 SQL 语句：

```js
const sql = `insert into ev_article_cate set ?`
```

2. 调用 `db.query()` 执行新增文章分类的 SQL 语句：

```js
db.query(sql, req.body, (err, results) => {
  // SQL 语句执行失败
  if (err) return res.encap(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('新增文章分类失败！')

  // 新增文章分类成功
  res.encap('新增文章分类成功！', 0)
})
```

### 4.4 根据 Id 删除文章分类

#### 4.4.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 实现删除文章分类的功能

#### 4.4.1 定义路由和处理函数

1. 在 `/router/artcate.js` 模块中，添加 `删除文章分类` 的路由：

```js
// 删除文章分类的路由
router.get('/deletecate/:id', artcate_handler.deleteCateById)
```

2. 在 `/router_handler/artcate.js` 模块中，定义并向外共享 `删除文章分类` 的路由处理函数：

```js
// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  res.send('ok')
}
```

#### 4.4.2 验证表单数据

1. 在 `/schema/artcate.js` 验证规则模块中，定义 id 的验证规则如下：

```js
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
```

2. 并使用 `exports` 向外共享如下的 `验证规则对象`：

```js
// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
}
```

3. 在 `/router/artcate.js` 模块中，导入需要的验证规则对象，并在路由中使用：

```js
// 导入删除分类的验证规则对象
const { delete_cate_schema } = require('../schema/artcate')

// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
```

#### 4.4.3 实现删除文章分类的功能

1. 定义删除文章分类的 SQL 语句：

```js
const sql = `update ev_article_cate set is_delete=1 where id=?`
```

2. 调用 `db.query()` 执行删除文章分类的 SQL 语句：

```js
db.query(sql, req.params.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('删除文章分类失败！')

  // 删除文章分类成功
  res.encap('删除文章分类成功！', 0)
})
```

### 4.5 根据 Id 获取文章分类数据

#### 4.5.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 实现获取文章分类的功能

#### 4.5.1 定义路由和处理函数

1. 在 `/router/artcate.js` 模块中，添加 `根据 Id 获取文章分类` 的路由：

```js
router.get('/cates/:id', artcate_handler.getArticleById)
```

2. 在 `/router_handler/artcate.js` 模块中，定义并向外共享 `根据 Id 获取文章分类` 的路由处理函数：

```js
// 根据 Id 获取文章分类的处理函数
exports.getArticleById = (req, res) => {
  res.send('ok')
}
```

#### 4.5.2 验证表单数据

1. 在 `/schema/artcate.js` 验证规则模块中，使用 `exports` 向外共享如下的 `验证规则对象`：

```js
// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
  params: {
    id,
  },
}
```

2. 在 `/router/artcate.js` 模块中，导入需要的验证规则对象，并在路由中使用：

```js
// 导入根据 Id 获取分类的验证规则对象
const { get_cate_schema } = require('../schema/artcate')

// 根据 Id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleById)
```

#### 4.5.3 实现获取文章分类的功能

1. 定义根据 Id 获取文章分类的 SQL 语句：

```js
const sql = `select * from ev_article_cate where id=?`
```

2. 调用 `db.query()` 执行 SQL 语句：

```js
db.query(sql, req.params.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // SQL 语句执行成功，但是没有查询到任何数据
  if (results.length !== 1) return res.encap('获取文章分类数据失败！')

  // 把数据响应给客户端
  res.send({
    status: 0,
    message: '获取文章分类数据成功！',
    data: results[0],
  })
})
```

### 4.6 根据 Id 更新文章分类数据

#### 4.6.0 实现步骤

1. 定义路由和处理函数
2. 验证表单数据
3. 查询 `分类名称` 与 `分类别名` 是否被占用
4. 实现更新文章分类的功能

#### 4.6.1 定义路由和处理函数

1. 在 `/router/artcate.js` 模块中，添加 `更新文章分类` 的路由：

```js
// 更新文章分类的路由
router.post('/updatecate', artcate_handler.updateCateById)
```

2. 在 `/router_handler/artcate.js` 模块中，定义并向外共享 `更新文章分类` 的路由处理函数：

```js
// 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  res.send('ok')
}
```

#### 4.6.2 验证表单数据

1. 在 `/schema/artcate.js` 验证规则模块中，使用 `exports` 向外共享如下的 `验证规则对象`：

```js
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
}
```

2. 在 `/router/artcate.js` 模块中，导入需要的验证规则对象，并在路由中使用：

```js
// 导入更新文章分类的验证规则对象
const { update_cate_schema } = require('../schema/artcate')

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)
```

#### 4.5.4 查询分类名称与别名是否被占用

1. 定义查重的 SQL 语句：

```js
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
```

2. 调用 `db.query()` 执行查重的操作：

```js
// 执行查重操作
db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 判断 分类名称 和 分类别名 是否被占用
  if (results.length === 2) return res.encap('分类名称与别名被占用，请更换后重试！')
  if (results.length === 1 && results[0].name === req.body.name) return res.encap('分类名称被占用，请更换后重试！')
  if (results.length === 1 && results[0].alias === req.body.alias) return res.encap('分类别名被占用，请更换后重试！')

  // TODO：更新文章分类
})
```

#### 4.5.5 实现更新文章分类的功能

1. 定义更新文章分类的 SQL 语句：

```js
const sql = `update ev_article_cate set ? where Id=?`
```

2. 调用 `db.query()` 执行 SQL 语句：

```js
db.query(sql, [req.body, req.body.Id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('更新文章分类失败！')

  // 更新文章分类成功
  res.encap('更新文章分类成功！', 0)
})
```

## 5. 文章管理

### 5.1 新建 ev_articles 表

![ev_articles表结构](./images/4.jpg)

### 5.2 发布新文章

#### 5.2.0 实现步骤

1. 初始化路由模块
2. 初始化路由处理函数模块
3. 使用 multer 解析表单数据
4. 验证表单数据
5. 实现发布文章的功能

#### 5.2.1 初始化路由模块

1. 创建 `/router/article.js` 路由模块，并初始化如下的代码结构：

```js
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 发布新文章
router.post('/add', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```

2. 在 `app.js` 中导入并使用文章的路由模块：

```js
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
```

#### 5.2.2 初始化路由处理函数模块

1. 创建 `/router_handler/article.js` 路由处理函数模块，并初始化如下的代码结构：

```js
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  res.send('ok')
}
```

2. 修改 `/router/article.js` 中的代码如下：

```js
const express = require('express')
const router = express.Router()

// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

// 发布新文章
router.post('/add', article_handler.addArticle)

module.exports = router
```

#### 5.2.3 使用 multer 解析表单数据

> 注意：使用 `express.urlencoded()` 中间件无法解析 `multipart/form-data` 格式的请求体数据。

> 当前项目，推荐使用 multer 来解析 `multipart/form-data` 格式的表单数据。https://www.npmjs.com/package/multer

1. 运行如下的终端命令，在项目中安装 `multer`：

```bash
npm i multer@1.4.2
```

2. 在 `/router_handler/article.js` 模块中导入并配置 `multer`：

```js
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
```

3. 修改 `发布新文章` 的路由如下：

```js
// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), article_handler.addArticle)
```

4. 在 `/router_handler/article.js` 模块中的 `addArticle` 处理函数中，将 `multer` 解析出来的数据进行打印：

```js
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.body) // 文本类型的数据
  console.log('--------分割线----------')
  console.log(req.file) // 文件类型的数据

  res.send('ok')
})
```

#### 5.2.4 [验证表单数据](https://www.npmjs.com/package/express-joi-validation?activeTab=readme#validatorparamsschema-options)

> 实现思路：通过 express-joi **自动验证** req.body 中的文本数据；通过 if 判断**手动验证** req.file 中的文件数据；

1. 创建 `/schema/article.js` 验证规则模块，并初始化如下的代码结构：

```js
// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}
```

2. 在 `/router/article.js` 模块中，导入需要的验证规则对象，并在路由中使用：

```js
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 发布新文章的路由
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
```

3. 在 `/router_handler/article.js` 模块中的 `addArticle` 处理函数中，通过 `if` 判断客户端是否提交了 `封面图片`：

```js
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
  if (!req.file || req.file.fieldname !== 'cover_img') return res.encap('文章封面是必选参数！')

  // TODO：表单数据合法，继续后面的处理流程...
})
```

#### 5.2.5 实现发布文章的功能

1. 整理要插入数据库的文章信息对象：

```js
// 导入处理路径的 path 核心模块
const path = require('path')

const articleInfo = {
  // 标题、内容、状态、所属的分类Id
  ...req.body,
  // 文章封面在服务器端的存放路径
  cover_img: path.join('/uploads', req.file.filename),
  // 文章发布时间
  pub_date: new Date(),
  // 文章作者的Id
  author_id: req.user.id,
}
```

2. 定义发布文章的 SQL 语句：

```js
const sql = `insert into ev_articles set ?`
```

3. 调用 `db.query()` 执行发布文章的 SQL 语句：

```js
// 导入数据库操作模块
const db = require('../db/index')

// 执行 SQL 语句
db.query(sql, articleInfo, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.encap(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.encap('发布文章失败！')

  // 发布文章成功
  res.encap('发布文章成功', 0)
})
```

4. 在 `app.js` 中，使用 `express.static()` 中间件，将 `uploads` 目录中的图片托管为静态资源：

```js
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
```
