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

//@desc get all reviews of a company
//@route GET /api/v1/auth/companyReview/:id
//@access public
exports.getReview = asyncHandler(async (req, res, next) => {
	const companyId = req.params.id;
	console.log('req params ' + req.params);
	console.log('company ' + companyId);
	const ratings = await CompanyReview.find({ companyId });
	console.log('ratings' + ratings);

	if (ratings.length === 0) {
		return next(new ErrorResponse("Company doesn't have any reviews", 400));
	}
	res.status(200).json({
		success: true,
		data: ratings,
	});
});
