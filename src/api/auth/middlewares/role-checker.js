const { verifyAccessToken } = require("../../common/jwt");
const { ForbiddenError } = require("../../common/errors/customError");
const UsersService = require("../../users/users.service");
const usersService = new UsersService();
const { accessTokenAuth } = require("./access-token-auth");

const ROLE = {
	SUPER_ADMIN: 5,
	SCHOOL_ADMIN: 4,
	TEACHER: 3,
	STUDENT: 2,
	USER: 1,
};

const roleChecker = (ROLE) => async (req, res, next) => {
	try {
		const user = await usersService.getUserById({ id: res.user.id });
		const { role_id: userRole } = user;

		if (userRole >= ROLE) next();
		else throw new ForbiddenError("접근 권한이 없습니다.");
	} catch (e) {
		next(e);
	}
};

module.exports = {
	ROLE,
	roleChecker,
};
