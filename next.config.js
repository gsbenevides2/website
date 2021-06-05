const withImages = require('next-images')
const withPWA = require('next-pwa')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports =
	withBundleAnalyzer(
		withPWA(
			withImages({
				images: {domains: ['firebasestorage.googleapis.com']},
				future: {
					webpack5: true
				},
				pwa: {
					dest: 'public',
					disable: process.env.NODE_ENV !== 'production',
					importScripts: ['./firebase-messaging-sw.js']
				},
				esModule: true
			})
		)
	)

