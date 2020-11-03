/* eslint-disable object-property-newline,object-curly-newline */
module.exports = {
	telemetry: true,
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
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	buildModules: [
		['@nuxtjs/google-analytics', {
			id: 'UA-156659199-1'
		}],
		['@nuxtjs/google-adsense', {
			id: 'ca-pub-0416935199921114'
		}]
	],
	modules: [
		'nuxt-buefy'
	],
	srcDir: './app/shared'
};
