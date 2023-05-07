const passport = require("passport");
const LocalStrategy = require("passport-local");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const bcrypt = require("bcrypt");
const pool = require("./common/db");
const UserService = require("./users/users.service");
const userService = new UserService();
const jwt = require("./common/jwt");

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

module.exports = () => {
	passport.use(
		"local",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			async (email, password, done) => {
				const user = await getUserByEmail({ email });

				if (user) {
					const isMatch = await bcrypt.compare(password, user.password);
					if (isMatch) {
						const id = user.id;
						const accessToken = jwt.generateAccessToken({ email, id, role: user.role_id });
						const refreshToken = jwt.generateRefreshToken({ email, id, role: user.role_id });

						return done(null, {
							user,
							tokens: { accessToken, refreshToken },
						});
					} else return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
				}

				if (!user) return done(null, false, { message: "존재하지 않는 유저입니다." });
			}
		)
	);

	passport.use(
		"jwt-access",
		new JwtStrategy(jwtAccessOptions, async (payload, done) => {
			const { email } = payload;

			const user = await getUserByEmail({ email });

			if (user) {
				return done(null, user);
			}

			if (!user) return done(null, false, { message: "존재하지 않는 유저입니다." });
		})
	);

	passport.use(
		"jwt-refresh",
		new JwtStrategy(jwtRefreshOptions, async (payload, done) => {
			const { email } = payload;

			const user = await getUserByEmail({ email });

			if (user) {
				return done(null, user);
			}

			if (!user) return done(null, false, { message: "존재하지 않는 유저입니다." });
		})
	);
};

const accessTokenExtractor = function (req) {
	let token = null;
	if (req && req.cookies) token = req.cookies["access"];
	return token;
};

const refreshTokenExtractor = function (req) {
	let token = null;
	if (req && req.cookies) token = req.cookies["refresh"];
	return token;
};

const jwtAccessOptions = {
	jwtFromRequest: accessTokenExtractor,
	secretOrKey: JWT_ACCESS_SECRET,
};

const jwtRefreshOptions = {
	jwtFromRequest: refreshTokenExtractor,
	secretOrKey: JWT_REFRESH_SECRET,
};

const getUserByEmail = async ({ email }) => {
	return await userService.getUserByEmail({ email });
};
