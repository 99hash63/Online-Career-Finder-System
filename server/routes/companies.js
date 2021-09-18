const express = require('express');
const router = express.Router();
const {
	getCompanies,
	getMyCompanies,
	getCompany,
	addCompany,
	updateCompany,
	deleteCompany,
	getCompaniesInRadius,
	companyPhotoUpload,
	companyLogoUpload,
	companyCoverUpload,
} = require('../controllers/companies');

const Company = require('../models/Company');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
	.route('/')
	.get(advancedResults(Company), protect, getCompanies)
	.post(protect, addCompany);
router.route('/my').get(protect, getMyCompanies);
router
	.route('/:id')
	.get(protect, getCompany)
	.put(protect, updateCompany)
	.delete(protect, deleteCompany);
router.route('/radius/:zipcode/:distance').get(getCompaniesInRadius);
router.route('/:id/photo').put(protect, companyPhotoUpload);
router.route('/:id/logo').put(protect, companyLogoUpload);
router.route('/:id/cover').put(protect, companyCoverUpload);

module.exports = router;
