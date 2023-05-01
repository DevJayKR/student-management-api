const model = require('./school.model');

module.exports = class SchoolService {

	/**
	 * 
	 * @param {object} dto school_name,school_email 
	 * @returns 
	 */
	async createSchool(dto) {
		return await model.create(dto);
	}

	async findAllSchool() {
		return await model.find();
	}

	async findOneSchool(school_id) {
		return await model.findbyId(school_id);
	}

	async deleteSchool(school_id) {
		const index = await this.findOneSchool(school_id);

		if (index.length === 0) {
			return {
				success: false,
				message: "존재하지 않는 학교 아이디입니다.",
			};
		}

		return await model.delete(school_id);
	}

	async update(dto) {
		return await model.update(dto);
	}
};
