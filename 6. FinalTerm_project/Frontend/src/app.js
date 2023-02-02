// import indexTpl from "./views/index.art";
// import signInTpl from "./views/signin.art";

// // const html = indexTpl({});
// // console.log(html);
// const html = signI({});

// $("#root").html(html);
//import css 这样写会报错,因为webpack不认可css,需要安装webpack css loader

import router from "./routes";
router.go("/");
