const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require("../errors/httpStatusCode");
const response = require('../response');
module.exports ={
	errorHandler : (err, req, res, next) => {	
		console.error(err);
		res.status(err.statusCode).send(response.fail(err.message,err.data,err.statusCode));
	}
}