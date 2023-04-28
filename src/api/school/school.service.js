const { ulid } = require("ulid");
const model = require('./school.model');

module.exports = class SchoolService {
	//TODO: DATABASE 연결해서 생성
	schools = [];
	id = 1;

	async createSchool(dto) {
		return model.create(dto);
	}

	async findAllSchool() {
		return model.find();
	}

	findOneSchool(school_id) {

		return model.findbyId(school_id);
	}

	// findSchoolIndex(id) {
	// 	return this.schools.findIndex((school) => school.id === id);
	// }

	deleteSchool(school_id) {
		// const index = this.findSchoolIndex(id);

		// if (index === -1) {
		// 	return {
		// 		success: false,
		// 		message: "존재하지 않는 학교 아이디입니다.",
		// 	};
		// }

		// const school = this.findOneSchool(id);

		// this.schools.pop(index);

		// return school;
	}
};
