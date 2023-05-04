const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		return await Service.getUsers();
	},

	generateAdmin: async ({ email, password }) => {
		try {
			const newAdmin = await Service.generateAdmin({ email, password });
			return response.success("어드민 생성 성공", {
				newAdmin,
			});
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	createUser: async ({ email, password }) => {
		try {
			const newUser = await Service.createUser({ email, password });
			return response.success("회원가입 성공", newUser);
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	getUserByEmail: async ({ email }) => {
		return await Service.getUserByEmail({ email });
	},

	getUserById: async ({ id }) => {
		return await Service.getUserById({ id });
	},
};
