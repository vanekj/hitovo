import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
	meta: {
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'description', content: 'Coffee to water calculator' }
		],
		link: [{ rel: 'icon', href: '/favicon.svg' }]
	},
	srcDir: 'src/',
	typescript: {
		strict: true
	}
});
