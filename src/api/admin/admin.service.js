module.exports = class AdminService {
	id = 1;

	async generateAdmin({ username, password }) {
		return {
			id: this.id++,
			username,
			password,
		};
	}
};
