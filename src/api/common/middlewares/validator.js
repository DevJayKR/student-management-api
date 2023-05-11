const { BAD_REQUEST } = require("../errors/httpStatusCode");
const response = require("../response");
const validator = (schema, property) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		const valid = error == null;

		if (valid) {
			next();
		} else {
			const { details } = error;
			const message = details.map((i) => i.message).join(",");

			res.status(BAD_REQUEST).send(response.fail(message, {}, BAD_REQUEST));
		}
	};
};
module.exports = validator;
