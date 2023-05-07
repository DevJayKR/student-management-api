const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const validator = require("../common/middlewares/validator");
const { createSchema, getUserSchema } = require("./users.schemas");

router.get("/", validator(getUserSchema), async (req, res, next) => {
	try {
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
	} catch (e) {
		next(e);
	}
});

router.post("/private/generateAdmin", validator(createSchema), async (req, res, next) => {
	const { email, password } = req.body;
	try {
		res.send(await controller.generateAdmin({ email, password }));
	} catch (e) {
		next(e);
	}
});

router.post("/", validator(createSchema), async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await controller.createUser({ email, password });
		res.send(user);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
