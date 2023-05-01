const express = require("express");
const router = express.Router();
const controller = require('./school.controller');

router.get("/all", async (req, res) => res.send(await controller.findAllSchool()));

router.get("/", async (req, res) => {
    const { school_id } = req.query;
    res.send(await controller.findOneSchool(school_id));
});

router.post("/", async (req, res) => {
    const { school_name, school_email } = req.body;
    const dto = {
        school_name,
        school_email
    };

    res.send(await controller.createSchool(dto));
});

router.delete("/", async (req, res) => {
    const { school_id } = req.query;

    res.send(await controller.deleteSchool(school_id));
});

router.put("/", async (req, res) => {
    const { school_id } = req.query;
    const { school_name } = req.body;

    const dto = {
        school_id,
        school_name
    }

    res.send(await controller.updateSchool(dto));
})

module.exports = router;
