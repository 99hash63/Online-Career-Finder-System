const NodeGeocoder = require('node-geocoder');

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'http',
	apiKey: process.env.GECODER_API_KEY,
	formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
