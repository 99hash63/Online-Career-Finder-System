const express = require('express');
const router = express.Router();
const {
	getCompanies,
	getCompany,
	addCompany,
	updateCompany,
	deleteCompany,
} = require('../controllers/companies');

router.route('/').get(getCompanies).post(addCompany);
router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
