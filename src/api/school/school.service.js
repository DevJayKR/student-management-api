const { ulid } = require("ulid");

module.exports = class SchoolService {
	//TODO: DATABASE 연결해서 생성
	schools = [];
	id = 1;

	async createSchool({ schoolName, username, password }) {
		const school = {
			id: this.id++,
			schoolName,
			username,
			password,
			authCode: ulid(),
		};

		this.schools.push(school);

		return school;
	}

	async findAllSchool() {
		return this.schools;
	}

	findOneSchool(id) {
		return this.schools.find((school) => school.id === id);
	}

	findSchoolIndex(id) {
		return this.schools.findIndex((school) => school.id === id);
	}

	deleteSchool(id) {
		const index = this.findSchoolIndex(id);

		if (index === -1) {
			return {
				success: false,
				message: "존재하지 않는 학교 아이디입니다.",
			};
		}

		const school = this.findOneSchool(id);

		this.schools.pop(index);

		return school;
	}
};
