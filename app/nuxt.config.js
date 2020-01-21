/* eslint-disable object-property-newline,object-curly-newline */
module.exports = {
	mode: 'universal',
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		titleTemplate: 'Coffee to water calculator',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'description', content: 'Coffee to water calculator' }
		],
		script: [
			{ src: 'https://www.googletagmanager.com/gtag/js?id=UA-156659199-1', async: true }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	modules: [
		'nuxt-buefy'
	],
	plugins: [
		{ src: '~plugins/google-analytics.js', mode: 'client' }
	],
	srcDir: './app/shared'
};
