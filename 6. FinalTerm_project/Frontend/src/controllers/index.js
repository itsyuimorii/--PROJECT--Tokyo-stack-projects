//这里写具体逻辑
import indexTpl from "../views/index.art";
import signinTpl from "../views/signin.art";

const htmlIndex = indexTpl({});
const htmlSignin = signinTpl({});

//内部使用方法: 点击后的逻辑(这里的函数是拿事件对象的)
const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    router.go("/index");
  };
};

//signin路由真实的回调函数
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $("#signin").on("submit", _handleSubmit(router));
    // _handleSubmit(router);
  };
};

const index = (router) => {
  return (req, res, next) => {
    res.render(htmlIndex);

    //当页面加载完成以后, 让wrapper resize
    $(window, ".wrapper").resize();
  };
};

export { signin, index };
