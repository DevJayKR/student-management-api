const Joi = require("joi");

exports.createSchema = Joi.object({
	email: Joi.string().required().messages({
		"string.base": "이메일은 문자열로 이루어져야 합니다.",
		"any.required": "이메일은 필수 입력값입니다.",
	}),
	password: Joi.string().required().messages({
		"string.base": "패스워드는 문자열로 이루어져야 합니다.",
		"any.required": "패스워드는 필수 입력값입니다.",
	}),
	school_id: Joi.number().required().messages({
		"string.base": "학교번호는 숫자로 이루어져야 합니다.",
		"any.required": "학교번호는 필수 입력값입니다.",
	})
});
