module.exports = errorHandler = (err, req, res, next) => {
	res.json({
		success: false,
		statusCode: err.statusCode,
		name: err.name,
		message: err.message,
		data: err.data ?? undefined,
	});
};
