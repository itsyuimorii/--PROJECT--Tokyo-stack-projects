import SMERouter from "sme-router";

const router = new SMERouter("root");
console.log(router);

// $("#root").html(html);

// router.route("/", (req, res, next) => {
//   res.render(htmlSignin);
// });

import { signin, index } from "../controllers";

//这里需要传入router实例, 给controller里的方法用
router.route("/", signin(router));
router.route("/index", index(router));
// router.route("/signin", signin(router));

export default router;
