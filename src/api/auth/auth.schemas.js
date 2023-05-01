const Joi = require("joi");

exports.loginSchema = Joi.object({
	username: Joi.string().required().messages({
		"string.base": "유저네임은 문자열로 이루어져야 합니다.",
		"any.required": "유저네임은 필수 입력값입니다.",
	}),
	password: Joi.string().required().messages({
		"string.base": "패스워드는 문자열로 이루어져야 합니다.",
		"any.required": "패스워드는 필수 입력값입니다.",
	}),
});
