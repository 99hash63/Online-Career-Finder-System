const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CompanyReviewSchema = new mongoose.Schema({
	emp_state: {
		type: String,
		required: [true, 'Please add a name'],
		enum: ['Current Employee', 'Former Employee'],
	},

	job_title: {
		type: String,
		required: [true, 'Please add an email'],
	},

	name: {
		type: String,
	},

	comment: {
		type: String,
	},

	rate_cultureValue: {
		type: String,
	},
	rate_workLife: {
		type: String,
	},
	rate_seniorManagement: {
		type: String,
	},

	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'company',
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

module.exports = mongoose.model('CompanyReview', CompanyReviewSchema);
