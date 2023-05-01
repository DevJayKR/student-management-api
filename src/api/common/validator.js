const Joi = require("joi");
const response = require("../common/response");
const validator = (schema, property) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		const valid = error == null;

		if (valid) {
			next();
		} else {
			const { details } = error;
			const message = details.map((i) => i.message).join(",");

			res.status(400).send(response.fail(message, {}, 400));
		}
	};
};
module.exports = validator;
