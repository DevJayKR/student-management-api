const express = require("express");
const router = express.Router();
const controller = require('./school.controller');

//1 안
// router.get("/", async (req, res) => res.send(await controller.findAllSchool()));

// router.get("/:id", (req, res) => {
// 	const { id } = req.params;
// 	res.send(controller.findOneSchool(id));
// });

// router.post("/", async (req, res) => {
// 	const { schoolName, username, password } = req.body;

// 	const dto = {
// 		schoolName,
// 		username,
// 		password,
// 	};

// 	const school = await controller.createSchool(dto);

// 	res.send(school);
// });

// router.delete("/:id", (req, res) => {
// 	const { id } = req.params;

// 	res.send(controller.deleteSchool(id));
// });

//2안

router.get('/all', controller.findAllSchool);
router.get('/', controller.findOneSchool);
router.post('/', controller.createSchool);

module.exports = router;
