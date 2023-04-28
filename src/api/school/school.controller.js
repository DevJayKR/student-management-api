const SchoolService = require("./school.service");
const Service = new SchoolService();

// exports.findAllSchool = async () => await Service.findAllSchool();
// exports.findOneSchool = (id) => Service.findOneSchool(+id);
// exports.createSchool = async ({ schoolName, username, password }) => await Service.createSchool({ schoolName, username, password });
// exports.deleteSchool = (id) => Service.deleteSchool(+id);
// exports.updateSchool = (id) => Service.updateSchool(+id, {});

module.exports = {

    findAllSchool: async (req, res, next) => {
        try {
            const school = Service.findAllSchool();
            if (school.length === 0) throw new Error("Not Found");
            return res.status(200).send({ data: school, message: "Success to find" });
        } catch (error) {
            next(error);
        }
    },

    findOneSchool: async (req, res, next) => {
        try {
            const school = Service.findOneSchool(req);
            if (school.length === 0) throw new Error("Not Found");
            return res.status(200).send({ data: school, message: "Success to find" })
        } catch (error) {
            next(error);
        }
    }
}