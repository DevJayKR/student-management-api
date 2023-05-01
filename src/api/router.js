const express = require("express");
const router = express.Router();
const school = require("./school/index");
const users = require("./users/index");

router.use("/school", school);
router.use("/users", users);

module.exports = router;
