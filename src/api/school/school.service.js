const model = require('./school.model');

module.exports = class SchoolService {

	async createSchool({school_name,school_email}) {
		try {
			const school = await model.create({school_name,school_email});
			return school;
		} catch (error) {
			return error;
		}
	}
	
	async findAllSchool() {
		try {
			const schools = await model.find();
			return schools;
		} catch (error) {
			return error;
		}
	}

	async findOneSchool({school_id}) {
		try {
			const school = await model.findbyId({school_id});
			return school;
		} catch (error) {
			return error;
		}
	}

	async deleteSchool({school_id}) {
		try {
			const del = await model.delete({school_id});
			return del;
		} catch (error) {
			return error;
		}
	}
};
