exports.success = (message, _data, _statusCode) => {
	return {
		success: true,
		statusCode: _statusCode || 200,
		message,
		data: {
			..._data,
		},
	};
};

exports.fail = (message, _data, _errorCode) => {
	return {
		success: false,
		errorCode: _errorCode || 400,
		message,
		error: {
			..._data,
		},
	};
};
