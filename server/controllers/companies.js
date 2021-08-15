const Company = require('../models/Company');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc Get all companies
//@route GET /api/v1/companies
//@access public
exports.getCompanies = asyncHandler(async (req, res, next) => {
	const companies = await Company.find();

	res.status(200).json({
		success: true,
		count: companies.length,
		data: companies,
	});
});

//@desc Get a single company
//@route GET /api/v1/companies/:id
//@access public
exports.getCompany = asyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: company,
	});
});

//@desc Add new company
//@route POST /api/v1/companies
//@access public
exports.addCompany = asyncHandler(async (req, res, next) => {
	const company = await Company.create(req.body);

	res.status(201).json({
		success: true,
		data: company,
	});
});

//@desc Update a company
//@route PUT /api/v1/companies/:id
//@access public
exports.updateCompany = asyncHandler(async (req, res, next) => {
	const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!company) {
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: company,
	});
});

//@desc Delete a company
//@route DELETE /api/v1/companies/:id
//@access public
exports.deleteCompany = asyncHandler(async (req, res, next) => {
	const company = await Company.findByIdAndDelete(req.params.id);

	if (!company) {
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: company,
	});
});
