const SchoolService = require("./school.service");
const Service = new SchoolService();

exports.findAllSchool = async () => await Service.findAllSchool();
exports.findOneSchool = (id) => Service.findOneSchool(+id);
exports.createSchool = async ({ schoolName, username, password }) => await Service.createSchool({ schoolName, username, password });
exports.deleteSchool = (id) => Service.deleteSchool(+id);
exports.updateSchool = (id) => Service.updateSchool(+id, {});
