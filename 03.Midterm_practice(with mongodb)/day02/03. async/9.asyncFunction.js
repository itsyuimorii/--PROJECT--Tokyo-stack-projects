// 1. Add the async keyword in front of the ordinary function definition and the ordinary function becomes an asynchronous function
// 2. The default return value of an asynchronous function is a promise object
// 3. Use the throw keyword inside the asynchronous function to throw errors
//
// await keyword
// 1. It can only appear in asynchronous functions
// 2. await promise which suspends the execution of the asynchronous function and waits for the promise object to return the result before executing the function down the line

// async function fn () {
// throw 'Some errors have occurred';
// return 123;
// }

// // console.log(fn ())
// fn ().then(function (data) {
// console.log(data);
// }).catch(function (err){
// console.log(err);
// })

async function p1() {
  return "p1";
}

async function p2() {
  return "p2";
}

async function p3() {
  return "p3";
}

async function run() {
  let r1 = await p1();
  let r2 = await p2();
  let r3 = await p3();
  console.log(r1);
  console.log(r2);
  console.log(r3);
}

run();
