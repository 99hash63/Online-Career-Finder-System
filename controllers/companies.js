//@desc Get all companies
//@route GET /api/v1/companies
//@access public
exports.getCompanies = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, data: 'Show all companies', Message: req.hello });
};

//@desc Get a single company
//@route GET /api/v1/companies/:id
//@access public
exports.getCompany = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, data: `Show one company ${req.params.id}` });
};

//@desc Add new company
//@route POST /api/v1/companies
//@access public
exports.addCompany = (req, res, next) => {
	res.status(200).json({ success: true, data: 'Create a new company' });
};

//@desc Update a company
//@route PUT /api/v1/companies/:id
//@access public
exports.updateCompany = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, data: `Update company ${req.params.id}` });
};

//@desc Delete a company
//@route DELETE /api/v1/companies/:id
//@access public
exports.deleteCompany = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, data: `Delete company ${req.params.id}` });
};
