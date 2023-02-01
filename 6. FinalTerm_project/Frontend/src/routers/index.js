import { $dataMetaSchema } from "ajv";
import indexTpl from "./views/index.art";
import signInTpl from "./views/signin.art";

const router = new SMERouter("router-view");
const html = signInTpl({});

$("#root").html(html);

router.route("/signin", (req, res, next) => {
  res.render();
});
