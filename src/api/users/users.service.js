const model = require("./users.model");
const bcrpyt = require("bcrypt");

module.exports = class UsersService {
	async generateAdmin({ email, password }) {
		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.generateAdmin({ email, hashedPassword });
		const newAdmin = await model.getUserByEmail({ email });
		newAdmin.password = undefined;

		return newAdmin;
	}

	async createUser({ email, password }) {
		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.createUser({ email, hashedPassword });
		return await this.getUserByEmail({ email });
	}

	async getUserByEmail({ email }) {
		const user = await model.getUserByEmail({ email });
		return user;
	}

	async getUserById({ id }) {
		const user = await model.getUserById({ id });
		return user;
	}

	async getUsers() {
		return await model.getUsers();
	}
};
