const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");

// const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const goodsRouter = require("./routes/goods");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// Make the route effective
// app.use("/user", userRouter);
// app.use("/goods", goodsRouter);

// Second method of registering routes
app.use("/students", require("./routes/student"));

app.use((req, res) => {
  res.status(404);
  res.send("The address you are visiting has been hijacked by aliens");
});

app.listen(8080, () => {
  console.log("server listening on http://localhost:3000");
});
