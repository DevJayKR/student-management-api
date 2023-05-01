const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		return await Service.getUsers();
	},

	generateAdmin: async ({ username, password }) => {
		try {
			const newAdmin = await Service.generateAdmin({ username, password });
			return response.success("어드민 생성 성공", {
				newAdmin,
			});
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 유저네임입니다.");
		}
	},

	createUser: async ({ username, password }) => {
		try {
			const newUser = await Service.createUser({ username, password });
			return response.success("회원가입 성공", newUser);
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 유저네임입니다.");
		}
	},

	getUserByUsername: async ({ username }) => {
		return await Service.getUserByUsername({ username });
	},

	getUserById: async ({ id }) => {
		return await Service.getUserById({ id });
	},
};
