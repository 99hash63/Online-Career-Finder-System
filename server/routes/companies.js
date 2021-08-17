const express = require('express');
const router = express.Router();
const {
	getCompanies,
	getCompany,
	addCompany,
	updateCompany,
	deleteCompany,
	getCompaniesInRadius,
	companyPhotoUpload,
	companyLogoUpload,
	companyCoverUpload,
} = require('../controllers/companies');

router.route('/').get(getCompanies).post(addCompany);
router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);
router.route('/radius/:zipcode/:distance').get(getCompaniesInRadius);
router.route('/:id/photo').put(companyPhotoUpload);
router.route('/:id/logo').put(companyLogoUpload);
router.route('/:id/cover').put(companyCoverUpload);

module.exports = router;
