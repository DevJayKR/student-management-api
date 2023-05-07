const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const validator = require("../common/middlewares/validator");
const { createSchema } = require("./users.schemas");
const upload = require('../common/multer');

router.get("/", async (req, res, next) => {
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

router.post("/teacher",upload.single('image'),async(req,res)=>{
	const profile_image_url = req.file.path;
	const {email,password,name,grade,subject,gender,phone_nubmer,school_id,user_about} = req.body;
	const teacher = await controller.createTeacher({email,password,name,grade,subject,gender,phone_nubmer,school_id,profile_image_url,user_about})
	res.send(teacher);
})

router.post("/student",upload.single('image'),async(req,res)=>{
	const profile_image_url = req.file.path;
	const {email,password,name,grade,gender,phone_nubmer,school_id,user_about} = req.body;
	const student = await controller.createStudent({email,password,name,grade,gender,phone_nubmer,school_id,profile_image_url,user_about});
	res.send(student);
})

module.exports = router;
