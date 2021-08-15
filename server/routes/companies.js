const express = require('express');
const router = express.Router();
const {
	getCompanies,
	getCompany,
	addCompany,
	updateCompany,
	deleteCompany,
	getCompaniesInRadius,
} = require('../controllers/companies');

router.route('/').get(getCompanies).post(addCompany);
router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);
router.route('/radius/:zipcode/:distance').get(getCompaniesInRadius);

module.exports = router;
