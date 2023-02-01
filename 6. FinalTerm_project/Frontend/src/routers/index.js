import SMERouter from "sme-router";

const router = new SMERouter("root");

import { signin } from "../controller";
// $("#root").html(htmlIndex);

router.router("/", signin);
router.router("/signin");

// router.route("/", (req, res, next) => {
//   res.render(htmlIndex);
// });

// router.route("/signin", (req, res, next) => {
//   res.render(htmlSignin);
// });

export default router;
