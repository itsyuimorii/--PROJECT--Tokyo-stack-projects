function getData(callback) {
  callback("123");
}

getData(function (n) {
  console.log("callback function was called");
  console.log(n);
});
