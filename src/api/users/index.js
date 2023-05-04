const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const validator = require("../common/middlewares/validator");
const { createSchema } = require("./users.schemas");

router.get("/", async (req, res) => {
	if (req.query.email) {
		const { email } = req.query;
		const user = await controller.getUserByEmail({ email });
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
	const { email, password } = req.body;
	res.send(await controller.generateAdmin({ email, password }));
});

router.post("/", validator(createSchema), async (req, res) => {
	const { email, password } = req.body;
	const user = await controller.createUser({ email, password });
	res.send(user);
});

module.exports = router;
