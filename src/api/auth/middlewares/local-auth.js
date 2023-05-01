const passport = require("passport");

exports.localAuth = (req, res, next) => {
	passport.authenticate(
		"local",
		{
			successRedirect: "/",
			failureRedirect: "/login",
		},
		function (err, user, info) {
			if (info) return res.json(info);
			if (user) {
				res.user = user;
				next();
			}
		}
	)(req, res, next);
};
