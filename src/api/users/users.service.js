const model = require("./users.model");

module.exports = class UsersService {
	async generateAdmin({ username, password }) {
		await model.generateAdmin({ username, password });
		const newAdmin = await model.getUserByUsername({ username });
		newAdmin.password = undefined;

		return newAdmin;
	}

	async createUser({ username, password }) {
		await model.createUser({ username, password });
		return await this.getUserByUsername({ username });
	}

	async getUserByUsername({ username }) {
		const user = await model.getUserByUsername({ username });
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
