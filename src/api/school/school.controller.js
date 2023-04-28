const SchoolService = require("./school.service");
const Service = new SchoolService();

// 1안
// exports.findAllSchool = async () => await Service.findAllSchool();
// exports.findOneSchool = (id) => Service.findOneSchool(+id);
// exports.createSchool = async ({ schoolName, username, password }) => await Service.createSchool({ schoolName, username, password });
// exports.deleteSchool = (id) => Service.deleteSchool(+id);
// exports.updateSchool = (id) => Service.updateSchool(+id, {});

//2안
module.exports = {

    findAllSchool: async (req, res, next) => {
        try {
            const school = await Service.findAllSchool();
            if (school.length === 0) throw new Error("Not Found");
            return res.status(200).send({ data: school, message: "Success to find" });
        } catch (error) {
            next(error);
        }
    },

    findOneSchool: async (req, res, next) => {
        try {
            const school = await Service.findOneSchool(req);
            if (school.length === 0) throw new Error("Not Found");
            return res.status(200).send({ data: school, message: "Success to find" })
        } catch (error) {
            next(error);
        }
    },

    createSchool: async (req, res, next) => {
        try {
            const { school_id, school_name, school_email } = req.body;
            const dto = { school_id, school_name, school_email };
            const school = await Service.createSchool(dto);
            return res.status(200).send({ message: "Success to create" });
        } catch (error) {
            next(error);
        }
    }
}