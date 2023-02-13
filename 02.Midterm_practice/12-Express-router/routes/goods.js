const express = require("express");

const router = express.Router();

router.get("/list", (req, res) => {
  res.send("hello goodslists");
});

module.exports = router;
