// 1. set up the web server and realize the communication between the client and the server
// 2. connect to the database, create a collection of users, insert documents into the collection
// 3. query all user information when a user accesses the /list
// Implement the routing function
// render the user list page
// Query user information from the database Display user information in the list
// 4. stitch user information and form HTML and respond the stitching result back to the client
// 5. render the form page and add user information when user accesses/add
// 6. When the user visits /modify, the modification page is rendered and the user information is modified
// There are two major steps to modify user information
// 1. Add a page route to render the page
// 1.1 Pass the user ID to the current page when the modify button is clicked
// 1.2 Query the current user information from the database and display the user information on the page
// 2. Implementing the user modification function
// 2.1 Specify the form submission address and request method
// 2.2 Receive the modification information from the client, find the user, and change the user information to the latest one.
// 7. Implement the user delete function when the user accesses/deletes

const http = require("http");

const url = require("url");
const querystring = require("querystring");

//import user database
require("./model/index.js");
const User = require("./model/user.js");

const app = http.createServer();

// Add request events to the server object
app.on("request", async (req, res) => {
  const method = req.method;
  const { pathname, query } = url.parse(req.url, true);

  if (method == "GET") {
    // Render the user list page
    if (pathname == "/list") {
      // Query user information
      let users = await User.find();
      // html string
      let list = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>User List</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h6>
							<a href="/add" class="btn btn-primary">添加用户</a>
						</h6>
						<table class="table table-striped table-bordered">
							<tr>
								<td>用户名</td>
								<td>年龄</td>
								<td>爱好</td>
								<td>邮箱</td>
								<td>操作</td>
							</tr>
			`;

      // Loop operations on data
      users.forEach((item) => {
        list += `
					<tr>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>
				`;

        item.hobbies.forEach((item) => {
          list += `<span>${item}</span>`;
        });

        list += `</td>
						<td>${item.email}</td>
						<td>
							<a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">delete</a>
							<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">edit</a>
						</td>
					</tr>`;
      });

      list += `
						</table>
					</div>
				</body>
				</html>
			`;
      res.end(list);
    } else if (pathname == "/add") {
      // Render the Add User Form page
      let add = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>User List</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h3>添加用户</h3>
						<form method="post" action="/add">
						  <div class="form-group">
						    <label>用户名</label>
						    <input name="name" type="text" class="form-control" placeholder="请填写用户名">
						  </div>
						  <div class="form-group">
						    <label>密码</label>
						    <input name="password" type="password" class="form-control" placeholder="请输入密码">
						  </div>
						  <div class="form-group">
						    <label>年龄</label>
						    <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>邮箱</label>
						    <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>请选择爱好</label>
						    <div>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="足球" name="hobbies"> 足球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="篮球" name="hobbies"> 篮球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="烫头" name="hobbies"> 烫头
						    	</label>
						    </div>
						  </div>
						  <button type="submit" class="btn btn-primary">添加用户</button>
						</form>
					</div>
				</body>
				</html>
			`;
      res.end(add);
    } else if (pathname == "/modify") {
      let user = await User.findOne({ _id: query.id });
      let hobbies = [
        "足球",
        "篮球",
        "橄榄球",
        "敲代码",
        "抽烟",
        "喝酒",
        "烫头",
        "吃饭",
        "睡觉",
        "打豆豆",
      ];
      console.log(user);
      // 呈现修改用户表单页面
      let modify = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h3>修改用户</h3>
						<form method="post" action="/modify?id=${user._id}">
						  <div class="form-group">
						    <label>用户名</label>
						    <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
						  </div>
						  <div class="form-group">
						    <label>密码</label>
						    <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
						  </div>
						  <div class="form-group">
						    <label>年龄</label>
						    <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>邮箱</label>
						    <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>请选择爱好</label>
						    <div>
						    	
						    
			`;

      hobbies.forEach((item) => {
        // 判断当前循环项在不在用户的爱好数据组
        let isHobby = user.hobbies.includes(item);
        if (isHobby) {
          modify += `
						<label class="checkbox-inline">
						  <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
						</label>
					`;
        } else {
          modify += `
						<label class="checkbox-inline">
						  <input type="checkbox" value="${item}" name="hobbies"> ${item}
						</label>
					`;
        }
      });

      modify += `
						    </div>
						  </div>
						  <button type="submit" class="btn btn-primary">修改用户</button>
						</form>
					</div>
				</body>
				</html>
			`;
      res.end(modify);
    } else if (pathname == "/remove") {
      // res.end(query.id)
      await User.findOneAndDelete({ _id: query.id });
      res.writeHead(301, {
        Location: "/list",
      });
      res.end();
    }
  } else if (method == "POST") {
    // 用户添加功能
    if (pathname == "/add") {
      // 接受用户提交的信息
      let formData = "";
      // 接受post参数
      req.on("data", (param) => {
        formData += param;
      });
      // post参数接受完毕
      req.on("end", async () => {
        let user = querystring.parse(formData);
        // 将用户提交的信息添加到数据库中
        await User.create(user);
        // 301代表重定向
        // location 跳转地址
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    } else if (pathname == "/modify") {
      // 接受用户提交的信息
      let formData = "";
      // 接受post参数
      req.on("data", (param) => {
        formData += param;
      });
      // post参数接受完毕
      req.on("end", async () => {
        let user = querystring.parse(formData);
        // 将用户提交的信息添加到数据库中
        await User.updateOne({ _id: query.id }, user);
        // 301代表重定向
        // location 跳转地址
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    }
  }
});

app.listen(3000);
