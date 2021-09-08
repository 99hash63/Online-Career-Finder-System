const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const CompanySchema = new mongoose.Schema({
	industry: {
		type: String,
		// required: [true, 'Please add an industry'],
		trim: true,
		enum: [
			'IT/Software',
			'Technology',
			'Real Estate',
			'Consumer Goods',
			'Automobile',
			'Other',
		],
	},

	emp_count: {
		type: String,
		// required: [true, 'Please add an emp_count'],
		trim: true,
		enum: ['0-10', '10-50', '50-200', '200-1000', 'Above 1000'],
	},

	founded: {
		type: Date,
		// required: [true, 'Please add a founded date'],
	},

	website: {
		type: String,
		// required: [true, 'Please add a website'],
		trim: true,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please use a valid URL with HTTP or HTTPS',
		],
	},

	revenue: {
		type: Number,
		// required: [true, 'Please add a revenue'],
	},

	address: {
		type: String,
		// required: [true, 'Please add an address'],
	},

	location: {
		//GeoJSON Point
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
		},
		coordinates: {
			type: [Number],
			index: '2dsphere',
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String,
	},

	title: {
		type: String,
		// required: [true, 'Please add a title'],
		minLength: [1, 'Title should be more than 1 character'],
		maxLength: [50, 'Title should be below 50 characters'],
		unique: true,
	},

	slug: String,

	description: {
		type: String,
		// required: [true, 'Please add a description'],
		minLength: [50, 'Description should be more than 50 characters'],
		maxLength: [500, 'Description should be below 500 characters'],
	},

	//Images
	logo: {
		type: String,
		default: 'no-photo.jpg',
	},

	coverPhoto: {
		type: String,
		default: 'no-photo.jpg',
	},

	otherPhotos: {
		type: [String],
		default: 'no-photo.jpg',
	},

	isPublic: {
		type: Boolean,
		default: false,
		// required: true,
	},

	createdAt: {
		type: String,
		default: new Date().toDateString(),
	},

	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

//Create company slug from the title
CompanySchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

// Geocode & create location field
// CompanySchema.pre('save', async function (next) {
// 	const loc = await geocoder.geocode(this.address);
// 	this.location = {
// 		type: 'Point',
// 		coordinates: [loc[0].longitude, loc[0].latitude],
// 		formattedAddress: loc[0].formattedAddress,
// 		street: loc[0].streetName,
// 		city: loc[0].city,
// 		state: loc[0].stateCode,
// 		zipcode: loc[0].zipcode,
// 		country: loc[0].countryCode,
// 	};

// 	// Do not save address in DB
// 	this.address = undefined;
// 	next();
// });

module.exports = mongoose.model('Company', CompanySchema);
