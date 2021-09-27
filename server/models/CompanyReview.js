const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CompanyReviewSchema = new mongoose.Schema({
	emp_state: {
		type: String,
		required: [true, 'Please add emp_state'],
		enum: ['Current Employee', 'Former Employee'],
	},

	job_title: {
		type: String,
		required: [true, 'Please add job_title'],
	},

	name: {
		type: String,
	},

	comment: {
		type: String,
		required: [true, 'Please add a comment'],
	},

	rate_cultureValue: {
		type: String,
		required: [true, 'Please rate cultureValue'],
	},
	rate_workLife: {
		type: String,
		required: [true, 'Please rate workLife'],
	},
	rate_seniorManagement: {
		type: String,
		required: [true, 'Please rate seniorManagement'],
	},

	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'company',
		required: [true, 'Please add company Id'],
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, 'Please add user Id'],
	},
});

module.exports = mongoose.model('CompanyReview', CompanyReviewSchema);
