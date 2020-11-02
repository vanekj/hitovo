const http = require('http');

const express = require('express'),
	compression = require('compression'),
	helmet = require('helmet'),
	{ Nuxt, Builder } = require('nuxt');

const config = require('./config'),
	nuxtConfig = require('../nuxt.config');

(async () => {
	// Set nuxt config dev
	nuxtConfig.dev = config.isDevelopment;

	let app = express(),
		nuxt = new Nuxt(nuxtConfig);

	// If development, run Nuxt builder
	if (nuxtConfig.dev) {
		await new Builder(nuxt).build();
	}

	// Enable security headers
	app.use(helmet({
		contentSecurityPolicy: config.csp
	}));

	// Enable gzip compression
	app.use(compression());

	// Use Nuxt middleware
	app.use(nuxt.render);

	// Create HTTP web server
	http.createServer(app).listen(config.port, (error) => {
		if (error) {
			console.log('Error while starting the HTTP server', error);
			process.exit(1);
		} else {
			console.log(`HTTP server running on port http://localhost:${config.port}`);
		}
	});
})();
