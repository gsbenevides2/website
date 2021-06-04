const withImages = require('next-images')
const withPWA = require('next-pwa')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports =
	withBundleAnalyzer(
		withPWA(
			withImages({
				future: {
					webpack5: true
				},
				pwa: {
					dest: 'public',
					importScripts: ['./firebase-messaging-sw.js']
				},
				esModule: true
			})
		)
	)

