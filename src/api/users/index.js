const {Router}= require('express');
const router = Router();
const controller = require("./users.controller");
const validator = require("../common/middlewares/validator");
const { createSchema } = require("./users.schemas");
const upload = require('../common/multer');

router.get("/", controller.getUsers);

router.post("/private/admin", validator(createSchema), controller.generateAdmin);

router.post("/", validator(createSchema),controller.createUser);

router.post("/teacher",upload.single('image'),controller.createTeacher);

router.post("/student",upload.single('image'),controller.createStudent);

// router.get('/teacher',controller.getUserById);

// router.get('/student',controller.getUserById);

router.get('/teacher/all',controller.getTeachers);

router.get('/student/all',controller.getStudents);

router.put('/teacher',controller.updateTeacher);

router.put('/student',controller.updateStudent);

router.delete("/teacher",controller.deleteUser);

router.delete("/student",controller.deleteUser);

module.exports = router;
