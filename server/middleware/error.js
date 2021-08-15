const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log error to console
	console.log(err);

	// Mongoose bad ObjectId

	if (err.name === 'CastError') {
		const message = `The Id you entered: ${err.value} is invalid`;
		error = new ErrorResponse(message, 404);
	}

	// Monggose duplicate key
	if (err.code === 11000) {
		const key = Object.keys(err.keyValue);
		const message = `Duplicate value entered for field: ${key}`;
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}
	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error',
	});
};

module.exports = errorHandler;
