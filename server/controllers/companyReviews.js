const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const CompanyReview = require('../models/CompanyReview');
const { options } = require('../routes/companies');

//@desc add a review to the company
//@route POST /api/v1/auth/companyReview
//@access public
exports.addReview = asyncHandler(async (req, res, next) => {
	req.body.userId = req.user;
	const companyReview = await CompanyReview.create(req.body);

	res.status(201).json({
		success: true,
		data: companyReview,
	});
});
