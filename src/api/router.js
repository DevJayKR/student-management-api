const express = require("express");
const router = express.Router();
const school = require("./school/index");
const users = require("./users/index");
const auth = require("./auth/index");

router.use("/school", school);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
