const {Router} = require('express')
const router = Router();
const controller = require('./school.controller');
const { queryCheck,bodyCheck } = require('./school.schemas');
const validator = require('../common/middlewares/validator');

router.get("/all",controller.findAllSchool);
router.get("/",controller.findOneSchool);
router.post("/", validator(bodyCheck),controller.createSchool);
router.delete("/", controller.deleteSchool);

module.exports = router;
