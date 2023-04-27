const express = require("express");
const router = express.Router();
const controller = require("./admin.controller");

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	res.send(await controller.generateAdmin({ username, password }));
});

module.exports = router;
