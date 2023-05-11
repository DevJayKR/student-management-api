const express = require("express");
const router = express.Router();
const school = require("./school");
const users = require("./users");
const auth = require("./auth");

router.use("/school", school);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
