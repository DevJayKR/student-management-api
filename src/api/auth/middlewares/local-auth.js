const passport = require("passport");

exports.localAuth = (req, res, next) => {
	passport.authenticate(
		"local",
		{
			successRedirect: "/",
			failureRedirect: "/login",
		},
		function (err, result, info) {
			if (info) return res.json(info);
			if (result) {
				res.user = result.user;
				res.tokens = result.tokens;
				next();
			}
		}
	)(req, res, next);
};
