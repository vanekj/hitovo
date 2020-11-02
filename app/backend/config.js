const path = require('path');

// Set env variables
const isProduction = process.env.NODE_ENV === 'production',
	isDevelopment = !isProduction;

// Load env variables from .env when on development
if (isDevelopment) {
	require('dotenv').config({ // eslint-disable-line global-require
		path: path.join(__dirname, '../../.env')
	});
}

// Content Security Policy rules for Helmet middleware
const csp = {
	directives: {
		defaultSrc: [
			'\'self\''
		],
		fontSrc: [
			'http://cdn.materialdesignicons.com'
		],
		styleSrc: [
			'\'self\'',
			'\'unsafe-inline\'',
			'http://cdn.materialdesignicons.com'
		],
		scriptSrc: [
			'\'self\'',
			'\'unsafe-inline\'',
			'\'unsafe-eval\'',
			'https://www.google-analytics.com'
		]
	}
};

// Web server port
const port = process.env.PORT || 80;

// Set config; Init server models
module.exports = {
	isDevelopment,
	isProduction,
	csp,
	port
};
