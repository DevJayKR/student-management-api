const passport = require("passport");
const response = require("../../common/response");

exports.accessTokenAuth = (req, res, next) => {
	passport.authenticate(
		"jwt-access",
		{
			session: false,
		},
		(err, user, info) => {
			if (!user) return res.json(response.fail("허가되지 않은 접근입니다.", info));

			if (user) {
				user.password = undefined;
				res.user = user;
				next();
			}
		}
	)(req, res, next);
};
