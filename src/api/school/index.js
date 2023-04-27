const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => res.send(await controller.findAllSchool()));

router.get("/:id", (req, res) => {
	const { id } = req.params;
	res.send(controller.findOneSchool(id));
});

router.post("/", async (req, res) => {
	const { schoolName, username, password } = req.body;

	const dto = {
		schoolName,
		username,
		password,
	};

	const school = await controller.createSchool(dto);

	res.send(school);
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;

	res.send(controller.deleteSchool(id));
});

module.exports = router;
