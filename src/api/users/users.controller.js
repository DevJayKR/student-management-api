const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");
const { NotFoundError } = require("../common/errors/customError");

module.exports = {
	getUsers: async () => {
		return await Service.getUsers();
	},

	generateAdmin: async ({ email, password }) => {
		const newAdmin = await Service.generateAdmin({ email, password });
		return response.success("어드민 생성 성공", {
			newAdmin,
		});
	},

	createUser: async ({ email, password }) => {
		const newUser = await Service.createUser({ email, password });
		return response.success("회원가입 성공", newUser);
	},

	getUserByEmail: async ({ email }) => {
		const user = await Service.getUserByEmail({ email });

		if (user) return user;
		else throw new NotFoundError("존재하지 않는 유저입니다.");
	},

	getUserById: async ({ id }) => {
		const user = await Service.getUserById({ id });
		if (user) return user;
		else throw new NotFoundError("존재하지 않는 유저입니다.");
	},
};
