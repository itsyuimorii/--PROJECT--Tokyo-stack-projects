# 🚀 総合的な演習例

## **Example:** Login Demo

> The action in the form needs to be changed to `./login` in order to correspond to the index.js,
> click send button, it will trigger `res.send("login successfully");`

```html
<form action="/login" method="post"></form>
```

```js
app.post("/login"),
  (req, res) => {
    console.log("The request has been received~~");
    res.send("login successfully");
  };
```

> Get the username and password entered by the user `req.query	`

```js
// Verify that the user name and password entered by the user are correct
if (req.query.username === "admin" && req.query.password === "123456") {
  res.send("<h1>Login successful！</h1>");
} else {
  res.send("<h1>Wrong username or password!</h1>");
}
```

**Optimization code:**

```js
// Configure the path to the static resource
// public http://localhost:3000/
app.use(express.static(path.resolve(__dirname, "public")));
// Introduce middleware for parsing request bodies
app.use(express.urlencoded());

app.post("/login", (req, res) => {
  // get the parameters of the post request
  //(the parameters in the request body) via req.body
  // by default express does not automatically parse the request body and needs middleware to add functionality to it
  // console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;

  const loginUser = USERS.find((item) => {
    return item.username === username && item.password === password;
  });

  if (loginUser) {
    res.send(`<h1>Login successful ${loginUser.nickname}</h1>`);
  } else {
    res.send(`<h1>User name or password error</h1>`);
  }
});
```

## **Example: Student list Demo**

1.  create basic express server filename: _index.js_

```js
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
```

2. Importing _dependencies_, and _ejs_

```js
const path = require("path");
//Writing data to JSON, need fileSystem modules
const fs = require("fs").promises;

//using JSON to implement data persistence
const STUDENT_ARR = require("./data/students.json");

// Set ejs as the default template engine
app.set("view engine", "ejs");
//Configure the path to the template
app.set("views", path.resolve(__dirname, "views"));

// Processing request body parsing
app.use(express.urlencoded({ extended: true }));

// Configure to use static resource paths
app.use(express.satic(path.resolve(__dirname, "views")));

....routes

//Configure error routes, need to be under all routes
app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

//Start a server listening
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
```

### Function 1: add new user

3. Adding `new users` to the data

> 💡The idea of adding user added data to the browser is:

1. get the data entered by the user(via different routes)

   - create a new routing `app.post("/addStudent", (req, res) => {})`

   - Receive data by Object

     ```js
     app.post("/addStudent", (req, res) => {
       const id = STUDENT_ARR.at(-1).id + 1;
       // const newUser = req.body;
       const newUser = {
         id,
         name: req.body.name,
         age: req.body.age,
         gender: req.body.gender,
         country: req.body.country,
       };
     ```

2. Validate the user information(skip)

3. Add user information to the array

   - `STUDENT_ARR.push(newUser);`

4. Add data to `JSON` (to achieve data persistence)

   ```js
   // Data persistence: Write new data to a json file
     fs.writeFile(
       path.resolve(__dirname, "./data/students.json"),
       JSON.stringify(STUDENT_ARR)
     )
       .then(() => {
     		// res.redirect() is used to initiate a request redirection
         // The purpose of the redirect is to tell the browser that you are making another request to another address
         res.redirect("/students");
       })
       .catch(() => {
         //.......
       });
   });
   ```

5. filename: student.ejs

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>This is the ejs template</title>
    <style>
      table {
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px #649a55 solid;
        font-size: 14px;
        padding: 10px;
        text-align: center;
      }

      caption {
        font-size: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <!-- It is possible to display the data passed in by render directly in the web page -->
    <table>
      <caption>
        student list
      </caption>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>gender</th>
          <th>Country</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        <% for(const stu of stuData){ %>
        <tr>
          <td><%=stu.id%></td>
          <td><%=stu.name %></td>
          <td><%=stu.age %></td>
          <td><%=stu.gender %></td>
          <td><%=stu.country %></td>
          <td><a href="">delete</a> <a href="">edit</a></td>
        </tr>
        <% } %>
      </tbody>
    </table>

    <form action="/addStudent" method="post">
      <div>
        name: <input type="text" name="name" placeholder="insert your name" />
      </div>
      <div>
        age: <input type="text" name="age" placeholder="insert your age" />
      </div>
      <div>
        gender:<input type="radio" name="gender" value="male" /> male
        <input type="radio" name="gender" value="female" /> female
      </div>
      <div>
        country:
        <input type="text" name="country" placeholder="insert your country" />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  </body>
</html>
```

### Function 2: delete and edit function

- Function: After clicking Delete🔗, delete the current data

1. Click the delete button to delete the student with id 5
2. send a request to the route
3. how to write the route?
   - Get the student id n
   - Delete the student with id n
   - Write the new array to the file
   - Redirect to student list page

> change const to let, as the data need to be changed

```js
let STUDENT_ARR = require("./data/students.json");
```

```js
app.get("/delete", (req, res) => {
  // Get the id of the student to be deleted
  const id = +req.query.id;
  console.log(id);
  //delete students based on id
  STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id);

  // Data persistence: Write new data to a json file
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENT_ARR)
  )
    .then(() => {
      // res.redirect() is used to initiate a request redirection
      // The purpose of the redirect is to tell the browser that you are making another request to another address
      res.redirect("/students");
    })
    .catch(() => {
      //.......
    });
});
```

> NOTE: Note that there is a type conversion here, the student's id is of type number, the parameter passed by the query is of type string, so need to do a **type conversion** 

```js
const id = +req.query.id;
STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id);
```

> Add the operation of determining whether to delete

```html
  <a onclick="return confirm('confirm delete')" href="/delete?id=<%=stu.id%>">删除</a>
```

 After deleting all of them, id will become undefined, We need to add a judgment, when the id is not available, return a 1 

```js
  const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
```

### Function 3: Update student info

   - After clicking on the modify link, a form will be displayed, which should contain the information of the student to be modified, and the user should modify the student's information and click on the button to submit the form after the modification.

     - Process: 

       1. click on update link, jump to update route

       - This `route` will return a page with a form that should display various information about new info

         3. the user fills out the form and clicks a button to submit it to a new route
            - Get the student information and make changes to it

Step1: create a new route`update.ejs`

```js
app.get("/to-update", (req, res) => {
  res.render("update");
});
```

Step2: student.ejs` <a>` link

```js
<a href="/to-update">edit</a>
```

Step3:  To modify student information, need to jump to another page- filename `update.ejs`, 

get all the student information with id of a certain value, and render the dynamic data in this file

```js
<body>
     <h1>Update student information</h1>
    <form action="/update-student" method="post">
        <div>
          name: <input type="text" name="name" placeholder="insert your name" />
        </div>
        <div>
          age: <input type="text" name="age" placeholder="insert your age" />
        </div>
        <div>
          gender:<input type="radio" name="gender" value="male" /> male
          <input type="radio" name="gender" value="female" /> female
        </div>
        <div>
          country:
          <input type="text" name="country" placeholder="insert your country" />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
 </body>
```

Step 4: In the route we need to get the information of the student to be modified

```js
app.get("/to-update", (req, res) => {
    const id = +req.query.id
    const student = STUDENT_ARR.find((item) => item.id === id)
    console.log(student);
    res.render("update", { student })
})

//console return { id: 1, name: 'AAAAA', age: '22', gender: 'male', country: 'AAAAA' }
```

Step 5: Get the update id in the client student.ejs

```js
<a href="/to-update?id=<%=stu.id%>">edit</a>
```

Step 5: 👆The above steps complete the update route, and get the student data in the route, the next step is to display the data back to the user in update.ejs.

Step 6: update-student, Need to write data to JSON 

```js
//After fill the update form, need to submit it to a new route
//get student information and edit the information
app.post("/update-student", (req, res) => {
  const { id, name, age, gender, country } = req.body;
  console.log(id, name, age, gender, country);

  // Modify student information
  // Get student object based on student id
  const student = STUDENT_ARR.find((item) => item.id == id);

  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.country = country;

  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENT_ARR)
  )
    .then(() => {
      // res.redirect() is used to initiate a request redirection
      // The purpose of the redirect is to tell the browser that you are making another request to another address

      res.redirect("/students");
    })
    .catch(() => {
      // ....
    });
});
```

### Code optimization, introduction of `Router()`

1. In the `index.js` file, **register the route** with `app.use`, and **require** the route file `student.js`

```js
//first method of registering routes
const goodsRouter = require("./routes/goods");
app.use("/goods", userRouter);

// Second method of registering routes
app.use("/students", require("./routes/student"));
```

```console
http://localhost:3000/students/list
```

2. routers📁 => `student.js`

```js
const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

let STUDENT_ARR = require("../data/students.json");

//Routing of student lists
router.get("/list", (req, res) => {
  res.render("students", { stuData: STUDENT_ARR });
});
```

💥: **NOTES**

- The path **must be** modified !

  `students.ejs`
  
  ```ejs
  都要加上 /students/  
  <form action="/students/add" method="post">
    		  <td>
              <a
                onclick="return confirm('confirm delete')"
                href="/students/delete?id=<%=stu.id%>"
                >delete</a
              >
              <a href="/students/to-update?id=<%=stu.id%>">edit</a>
            </td>
  ```
  
  `update.ejs`
  
  ```ejs
   <form action="/students/update-student" method="post">=
  ```
  
  ```js
  let STUDENT_ARR = require("../data/students.json");
  ...
  path.resolve(__dirname, "../data/students.json"),
  ...
  res.redirect("/students/list");
  ```

3. Extraction Middleware for processing fs

   ```js
   // Middleware for extracting and processing stored files
   router.use((req, res) => {
     fs.writeFile(
       path.resolve(__dirname, "../data/students.json"),
       JSON.stringify(STUDENT_ARR)
     )
       .then(() => {
         res.redirect("/students/list");
       })
       .catch(() => {
         res.send("error");
       });
   });
   ```

   4. **final code** for `routes` ->` student.js`

      ```js
      const express = require("express");
      const router = express.Router();
      const fs = require("fs/promises");
      const path = require("path");
      
      let STUDENT_ARR = require("../data/students.json");
      
      //Routing of the /student list
      router.get("/list", (req, res) => {
        res.render("students", { stuData: STUDENT_ARR });
      });
      
      // Add a route for students
      router.post("/add", (req, res, next) => {
        const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1;
      
        const newUser = {
          id,
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          country: req.body.country,
        };
        //console.log(newUser);
        //2. Validate user information(skip)
      
        //3. Add user information to the array
        STUDENT_ARR.push(newUser);
      
        // 4. call next(), leave it to subsequent routes to continue processing
        next();
      });
      //Delete the student's route
      router.get("/delete", (req, res, next) => {
        const id = +req.query.id;
        console.log(id);
      
        STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id);
      
        next();
      });
      
      //Routing of /Update Student Information
      router.post("/update-student", (req, res, next) => {
        const { id, name, age, gender, address } = req.body;
        const student = STUDENT_ARR.find((item) => item.id == id);
      
        student.name = name;
        student.age = +age;
        student.gender = gender;
        student.address = address;
        next();
      });
      
      router.get("/to-update", (req, res) => {
        const id = +req.query.id;
        const student = STUDENT_ARR.find((item) => item.id === id);
      
        res.render("update", { student });
      });
      
      // Middleware for extracting and processing stored files
      router.use((req, res) => {
        fs.writeFile(
          path.resolve(__dirname, "../data/students.json"),
          JSON.stringify(STUDENT_ARR)
        )
          .then(() => {
            res.redirect("/students/list");
          })
          .catch(() => {
            res.send("error");
          });
      });
      
      module.exports = router;
      ```

      ### Function 4: 🍪 cookie (login)

      ```js
      app.post("/login", (req, res) => {
        // Get the user's username and password
        const { username, password } = req.body;
        if (username === "admin" && password === "123123") {
          // Login was successful
          //res.send("Login successful");
          res.redirect("/students/list");
      });
      ```

      `login.ejs`

      ```ejs
      <form action="/login" method="post">
      ```

      But 👆 the way it's written, it makes no sense, so here's where the `cookie` comes in



###  その他の知識 HTTP

> ***Hypertext Transfer Protocol (HTTP)\*** is an [application-layer](https://en.wikipedia.org/wiki/Application_Layer) protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes. HTTP follows a classical [client-server model](https://en.wikipedia.org/wiki/Client–server_model), with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a [stateless protocol](https://en.wikipedia.org/wiki/Stateless_protocol), meaning that the server does not keep any data (state) between two requests.

💡 The HTTP protocol is a stateless protocol and the server cannot distinguish whether a request is sent from the same client or not.
