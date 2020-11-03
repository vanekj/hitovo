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

// Web server port
const port = process.env.PORT || 80;

// Set config; Init server models
module.exports = {
	isDevelopment,
	isProduction,
	port
};
