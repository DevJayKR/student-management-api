const { BAD_REQUEST, NOT_FOUND } = require("./errorStatusCode");

class ApplicationError extends Error {
	constructor(message, statusCode, data) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.data = data;
	}
}

class BadRequestError extends ApplicationError {
	constructor(message, data) {
		super(message, BAD_REQUEST, data);
		this.name = this.constructor.name;
	}
}

class NotFoundError extends ApplicationError {
	constructor(message, data) {
		super(message, NOT_FOUND, data);
		this.name = this.constructor.name;
	}
}

module.exports = { BadRequestError, NotFoundError };
