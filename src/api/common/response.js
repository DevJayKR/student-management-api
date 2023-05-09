exports.success = (message, _data, _statusCode) => {
	return {
		success: true,
		statusCode: _statusCode || 200,
		message,
		_data
	};
};

exports.successCreate = (message,_statusCode) =>{
	return {
		success: true,
		statusCode : _statusCode,
		message,
	}
}

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
