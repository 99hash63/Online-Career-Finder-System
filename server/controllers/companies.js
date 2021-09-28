const Company = require('../models/Company');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const path = require('path');

//@desc Get all companies
//@route GET /api/v1/companies
//@access public
exports.getCompanies = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

//@desc Get specific user's companies
//@route GET /api/v1/companies/my
//@access private
exports.getMyCompanies = asyncHandler(async (req, res, next) => {
	userId = req.user.id;

	const companies = await Company.find({ createdBy: userId });

	if (companies.length === 0) {
		return next(
			new ErrorResponse('This user does not have created any comapnies', 400)
		);
	}
	res.status(200).json({
		success: true,
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
//@access private
exports.addCompany = asyncHandler(async (req, res, next) => {
	if (!req.files) {
		return next(new ErrorResponse('Please upload a file', 400));
	}

	if (req.files) {
		const file = req.files.testFile;
		// Make sure the image is a photo
		if (!file.mimetype.startsWith('image')) {
			return next(new ErrorResponse('Please upload an image file', 400));
		}
		// Check file size
		if (file.size > process.env.MAX_FILE_UPLOAD) {
			return next(
				new ErrorResponse(
					`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
					400
				)
			);
		}
		// Create custom filename
		file.name = `cover_${req.body.title}${path.parse(file.name).ext}`;
		file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
			if (err) {
				console.error(err);
				return next(
					new ErrorResponse(
						`Problem with file upload${process.env.MAX_FILE_UPLOAD}`,
						500
					)
				);
			}
		});
		req.body.coverPhoto = 'http://localhost:5000/' + file.name;
	}
	req.body.createdBy = req.user;
	const company = await Company.create(req.body);

	res.status(201).json({
		success: true,
		data: company,
	});
});

//@desc Update a company
//@route PUT /api/v1/companies/:id
//@access private
exports.updateCompany = asyncHandler(async (req, res, next) => {
	req.body.createdBy = req.user;
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
//@access private
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

//@desc Upload other photos for companies
//@route PUT /api/v1/companies/:id/photo
//@access private
exports.companyPhotoUpload = asyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(new ErrorResponse('Please upload a file', 400));
	}

	const files = req.files.file;
	var arr = [];

	const result = files.map((file) => {
		// Make sure the image is a photo
		if (!file.mimetype.startsWith('image')) {
			return next(new ErrorResponse('Please upload an image file', 400));
		}

		// Check file size
		if (file.size > process.env.MAX_FILE_UPLOAD) {
			return next(
				new ErrorResponse(
					`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
					400
				)
			);
		}
		// Create custom filename
		// file.name = `photo_${company._id}${path.parse(file.name).ext}`;
		file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
			if (err) {
				console.error(err);
				return next(
					new ErrorResponse(
						`Problem with file upload${process.env.MAX_FILE_UPLOAD}`,
						500
					)
				);
			}
		});

		arr.push(file.name);
		console.log(arr);
	});

	await Company.findByIdAndUpdate(req.params.id, {
		otherPhotos: arr,
	});
	res.status(200).json({
		success: true,
	});
});

//@desc Upload company logo
//@route PUT /api/v1/companies/:id/logo
//@access private
exports.companyLogoUpload = asyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(new ErrorResponse('Please upload a file', 400));
	}

	const file = req.files.file;
	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse('Please upload an image file', 400));
	}
	// Check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
				400
			)
		);
	}

	// Create custom filename
	file.name = `logo_${company._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
			return next(
				new ErrorResponse(
					`Problem with file upload${process.env.MAX_FILE_UPLOAD}`,
					500
				)
			);
		}
	});

	await Company.findByIdAndUpdate(req.params.id, {
		logo: file.name,
	});
	res.status(200).json({
		success: true,
	});
});

//@desc Upload company cover photo
//@route PUT /api/v1/companies/:id/cover
//@access private
exports.companyCoverUpload = asyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		return next(
			new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(new ErrorResponse('Please upload a file', 400));
	}

	const file = req.files.file;
	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse('Please upload an image file', 400));
	}
	// Check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
				400
			)
		);
	}

	// Create custom filename
	file.name = `cover_${company._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
			return next(
				new ErrorResponse(
					`Problem with file upload${process.env.MAX_FILE_UPLOAD}`,
					500
				)
			);
		}
	});

	await Company.findByIdAndUpdate(req.params.id, {
		coverPhoto: file.name,
	});
	res.status(200).json({
		success: true,
	});
});
