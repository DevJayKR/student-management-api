const Joi = require("joi");

exports.bodyCheck = {
        school_name: Joi.string().required().messages({
            "string.base": "이름은 문자열로 이루어져야 합니다.",
            "any.required": "이름은 필수 입력값입니다.",
        }),
        school_email: Joi.string().required().messages({
            "string.base": "이메일은 문자열로 이루어져야 합니다.",
            "any.required": "이메일은 필수 입력값입니다.",
        })
    }