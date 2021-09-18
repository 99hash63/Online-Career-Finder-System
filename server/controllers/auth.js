const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const { options } = require('../routes/companies');

//@desc Register user
//@route POST /api/v1/auth/register
//@access public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	console.log(req.body);
	//create user
	const user = await User.create({
		name,
		email,
		password,
	});

	sendTokenResponse(user, 200, res);
	console.log('success');
});

//@desc Login user
//@route POST /api/v1/auth/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		//validate email & password
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user with email
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send rspone
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	//Have the sucre flag on a cookie if the server is running on production mode

	// if (process.env.NODE_ENV === 'production') {
	// 	options.secure = true;
	// }

	res.status(statusCode).cookie('token', token, options).json({
		token,
	});
};

//@desc Get current logged in user
//@route POST /api/v1/auth/me
//@access private
