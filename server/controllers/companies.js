const Company = require('../models/Company');

//@desc Get all companies
//@route GET /api/v1/companies
//@access public
exports.getCompanies = async (req, res, next) => {
	try {
		const companies = await Company.find();

		res.status(200).json({
			success: true,
			count: companies.length,
			data: companies,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err,
		});
	}
};

//@desc Get a single company
//@route GET /api/v1/companies/:id
//@access public
exports.getCompany = async (req, res, next) => {
	try {
		const company = await Company.findById(req.params.id);

		if (!company) {
			return res.status(400).json({
				success: false,
			});
		}

		res.status(200).json({
			success: true,
			data: company,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
		});
	}
};

//@desc Add new company
//@route POST /api/v1/companies
//@access public
exports.addCompany = async (req, res, next) => {
	try {
		const company = await Company.create(req.body);

		res.status(201).json({
			success: true,
			data: company,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
		});
	}
};

//@desc Update a company
//@route PUT /api/v1/companies/:id
//@access public
exports.updateCompany = async (req, res, next) => {
	try {
		const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!company) {
			return res.status(400).json({
				success: false,
			});
		}

		res.status(200).json({
			success: true,
			data: company,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
		});
	}
};

//@desc Delete a company
//@route DELETE /api/v1/companies/:id
//@access public
exports.deleteCompany = async (req, res, next) => {
	try {
		const company = await Company.findByIdAndDelete(req.params.id);

		if (!company) {
			return res.status(400).json({
				success: false,
			});
		}
		res.status(200).json({
			success: true,
			data: company,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
		});
	}
};
