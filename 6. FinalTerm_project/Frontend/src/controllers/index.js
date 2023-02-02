//这里写具体逻辑
import indexTpl from "../views/index.art";
import signinTpl from "../views/signin.art";
import usersTpl from "../views/users.art";

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

const _signup = () => {
  const $btnClose = $("#users-close");
  //提交表单

  $btnClose.click();
};

const signup = (router) => {};

const index = (router) => {
  return (req, res, next) => {
    res.render(htmlIndex);
    //填充用户列表
    $("#content").html(usersTpl());

    //在add new user的弹出框中点击保存, 提交新增用户的表单
    $("#users-save")._signup();
  };
};

export { signin, index };
