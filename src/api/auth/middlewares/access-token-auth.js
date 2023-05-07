const passport = require("passport");
const response = require("../../common/response");

exports.accessTokenAuth = (req, res, next) => {
	passport.authenticate(
		"jwt-access",
		{
			session: false,
		},
		(err, result, info) => {
			if (!result) return res.json(response.fail("허가되지 않은 접근입니다.", info));

			if (result) {
				res.user = result;
				next();
			}
		}
	)(req, res, next);
};
