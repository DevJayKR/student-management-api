const express = require("express");
const router = express.Router();
const { JWT_ACCESS_EXPIRATION_TIME, JWT_REFRESH_EXPIRATION_TIME } = process.env;
const { accessTokenAuth } = require("./middlewares/access-token-auth");
const { localAuth } = require("./middlewares/local-auth");
const validator = require("../common/middlewares/validator");
const { loginSchema } = require("./auth.schemas");

router.get("/test", accessTokenAuth, (req, res) => {
	res.send(res.user);
});

router.post("/login", validator(loginSchema), localAuth, (req, res) => {
	const { user } = res;

	res.cookie("access", user.accessToken, { httpOnly: true, maxAge: JWT_ACCESS_EXPIRATION_TIME, sameSite: "none" });
	res.cookie("refresh", user.refreshToken, { httpOnly: true, maxAge: JWT_REFRESH_EXPIRATION_TIME, sameSite: "none" });
	res.send(user);
});

router.post("/logout", (req, res) => {
	res.clearCookie("access", { maxAge: 0 });
	res.clearCookie("refresh", { maxAge: 0 });
	res.redirect("/");
});

module.exports = router;
