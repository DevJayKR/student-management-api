const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRATION_TIME, JWT_REFRESH_EXPIRATION_TIME } = process.env;

module.exports = {
	generateAccessToken: ({ email, id }) => {
		const payload = { email, id };

		return jwt.sign(payload, JWT_ACCESS_SECRET, {
			expiresIn: `${JWT_ACCESS_EXPIRATION_TIME}ms`,
			subject: "accessToken",
		});
	},

	generateRefreshToken: ({ email, id }) => {
		const payload = { email, id };

		return jwt.sign(payload, JWT_REFRESH_SECRET, {
			expiresIn: `${JWT_REFRESH_EXPIRATION_TIME}ms`,
			subject: "refreshToken",
		});
	},
};
