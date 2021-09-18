const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;
	var errorResponses = [];

	// Log error to console
	// console.log(err);

	// Mongoose bad ObjectId

	if (err.name === 'CastError') {
		const message = `The Id you entered: ${err.value} is invalid`;
		error = new ErrorResponse(message, 404);
	}

	// Monggose duplicate key
	if (err.code === 11000) {
		const key = Object.keys(err.keyValue);
		const message = `${key} already exists`;
		error = new ErrorResponse(message, 422);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		Object.values(err.errors).map((val) => {
			const message = val.message;
			error = new ErrorResponse(message, 422);
			errorResponses.push(error.message);
		});
	} else {
		errorResponses.push(error.message);
	}

	res.status(error.statusCode || 500).send(errorResponses || 'Server Error');
};

module.exports = errorHandler;
