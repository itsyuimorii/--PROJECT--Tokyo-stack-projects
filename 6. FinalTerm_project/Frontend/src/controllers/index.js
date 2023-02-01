import indexTpl from "../views/index.art";
import signInTpl from "../views/signin.art";

const htmlIndex = indexTpl({});
const htmlSignin = signInTpl({});

const signin = (req, res, next) => {
  res.render(htmlSignin);
};

const index = (req, res, next) => {
  res.render(htmlIndex);
};
export { signin, index };
