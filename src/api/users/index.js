const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const validator = require("../common/validator");
const { createSchema } = require("./users.schemas");

router.get("/", async (req, res) => {
	if (req.query.username) {
		const { username } = req.query;
		const user = await controller.getUserByUsername({ username });
		res.send(user);
	} else if (req.query.id) {
		const { id } = req.query;
		const user = await controller.getUserById({ id });
		res.send(user);
	} else {
		const users = await controller.getUsers();
		res.send(users);
	}
});

router.post("/private/generateAdmin", validator(createSchema), async (req, res) => {
	const { username, password } = req.body;
	res.send(await controller.generateAdmin({ username, password }));
});

router.post("/", validator(createSchema), async (req, res) => {
	const { username, password } = req.body;
	const user = await controller.createUser({ username, password });
	res.send(user);
});

module.exports = router;
