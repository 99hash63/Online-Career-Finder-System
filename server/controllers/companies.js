const Company = require('../models/Company');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

//@desc Get all companies
//@route GET /api/v1/companies
//@access public
exports.getCompanies = asyncHandler(async (req, res, next) => {
	//filtering by query string
	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude from query string
	const removeFields = ['select', 'sort', 'page', 'limit'];

	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	// Create query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators ($gt, $gte, etc)
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	// Finding resource
	query = Company.find(JSON.parse(queryStr));

	//select fields
	if (req.query.select) {
		// the fields given with commas are seperated with spaces
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 1;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Company.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// Executing query
	const companies = await query;

	// Pagination result
	const pagination = {};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	res.status(200).json({
		success: true,
		count: companies.length,
		pagination: pagination,
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

//@desc Get Companies with in a radius
//@route GET /api/v1/companies/radius/:zipcode/:distance
//@access public
exports.getCompaniesInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;

	// Get lat/lng from goecoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	// Calc radius using radians
	// Divide dist by radius of Earth
	// Earth Radius = 3,963 mi / 6,378 km
	const radius = distance / 6378;

	const companies = await Company.find({
		location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
	});

	res.status(200).json({
		success: true,
		count: companies.length,
		data: companies,
	});
});
