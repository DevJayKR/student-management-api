const { BAD_REQUEST, NOT_FOUND, FORBIDDEN, INTERNAL_SERVER_ERROR } = require("./httpStatusCode");

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

class ForbiddenError extends ApplicationError {
	constructor(message, data) {
		super(message, FORBIDDEN, data);
		this.name = this.constructor.name;
	}
}

class InternalServerError extends ApplicationError{
	constructor(message,data){
		super(message,INTERNAL_SERVER_ERROR,data);
		this.name = this.constructor.name;
	}
}

module.exports = { BadRequestError, NotFoundError, ForbiddenError, InternalServerError};
