const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//@desc Register user
//@route POST /api/v1/auth/register
//@access public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	//create user
	const user = await User.create({
		name,
		email,
		password,
	});

	// Create token
	const token = user.getSignedJwtToken();
	console.log(token);
	res.status(200).json({
		success: true,
		token,
	});
});



