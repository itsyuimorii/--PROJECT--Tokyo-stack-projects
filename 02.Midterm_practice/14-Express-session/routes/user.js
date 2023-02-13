const express = require("express");

const router = express.Router();

router.get("/lists", (req, res) => {
  res.send("this is user list");
});

module.exports = router;
