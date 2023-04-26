const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("school api");
});

module.exports = router;
