const AdminService = require("./admin.service");
const Service = new AdminService();

exports.generateAdmin = async ({ username, password }) => await Service.generateAdmin({ username, password });
