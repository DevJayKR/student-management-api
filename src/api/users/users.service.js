const model = require("./users.model");
const bcrpyt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../common/errors/customError");

module.exports = class UsersService {
	async generateAdmin({ email, password }) {
		const isExist = await this.getUserByEmail({ email });

		if (isExist) throw new BadRequestError("이미 사용중인 이메일입니다.", { email });

		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.generateAdmin({ email, hashedPassword });
		const newAdmin = await model.getUserByEmail({ email });
		newAdmin.password = undefined;

		return newAdmin;
	}

	async createUser({ email, password }) {
		const isExist = await this.getUserByEmail({ email });

		if (isExist) throw new BadRequestError("이미 사용중인 이메일입니다.", { email });

		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.createUser({ email, hashedPassword });
		return await this.getUserByEmail({ email });
	}

	async getUserByEmail({ email }) {
		return await model.getUserByEmail({ email });
	}

	async getUserById({ id }) {
		return await model.getUserById({ id });
	}

	async getUsers() {
		return await model.getUsers();
	}
};
