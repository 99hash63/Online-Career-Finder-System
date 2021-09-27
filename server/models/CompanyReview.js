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
		type: Number,
		required: [true, 'Please rate cultureValue'],
	},
	rate_workLife: {
		type: Number,
		required: [true, 'Please rate workLife'],
	},
	rate_seniorManagement: {
		type: Number,
		required: [true, 'Please rate seniorManagement'],
	},

	rate_overall: {
		type: Number,
		default: '',
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

//generate overall rating
CompanyReviewSchema.pre('save', function (next) {
	this.rate_overall =
		(this.rate_cultureValue + this.rate_workLife + this.rate_seniorManagement) /
		3;
	next();
});

module.exports = mongoose.model('CompanyReview', CompanyReviewSchema);
