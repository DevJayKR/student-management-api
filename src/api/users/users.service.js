const model = require("./users.model");

module.exports = class UsersService {
	async generateAdmin({ email, password }) {
		await model.generateAdmin({ email, password });
		const newAdmin = await model.getUserByEmail({ email });
		newAdmin.password = undefined;

		return newAdmin;
	}

	async createUser({ email, password }) {
		await model.createUser({ email, password });
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
