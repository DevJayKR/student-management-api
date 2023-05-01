const SchoolService = require("./school.service");
const Service = new SchoolService();

exports.findAllSchool = async () => await Service.findAllSchool();
exports.findOneSchool = async (school_id) => await Service.findOneSchool(school_id);
exports.createSchool = async (dto) => await Service.createSchool(dto);
exports.deleteSchool = async (school_id) => await Service.deleteSchool(school_id);
exports.updateSchool = async (dto) => await Service.updateSchool(dto);
