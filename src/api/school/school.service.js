const model = require('./school.model');

module.exports = class SchoolService {

	async createSchool({school_name,school_email}) {
		try {
			const school = await model.create({school_name,school_email});
			return school;
		} catch (error) {
			console.error(error);
			throw new Error("Error while creating school");
		}
	}
	
	async findAllSchool() {
		try {
			const schools = await model.find();
			return schools;
		} catch (error) {
			console.error(error);
			throw new Error("Error while finding schools");
		}
	}

	async findOneSchool({school_id}) {
		try {
			const school = await model.findbyId({school_id});
			return school;
		} catch (error) {
			console.error(error);
			throw new Error("Error while finding by school_id");
		}
	}

	async deleteSchool({school_id}) {
		try {
			const del = await model.delete({school_id});
			return del;
		} catch (error) {
			console.error(error);
			throw new Error("Error while deleting school");
		}
	}
};
