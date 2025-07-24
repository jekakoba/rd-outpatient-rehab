export default {
	tailwindcss: false,
	images: {
		makeWebp: true,
		ignoreWebpClasses: ['ignore-webp'],
		imageQuality: {
			generateWebP: true,
			webpOptions: { lossless: false, quality: 75 },
			jpegOptions: { quality: 80, progressive: true, mozjpeg: true },
			pngOptions: { compressionLevel: 9, progressive: true },
		}
	},

	serverProxy: {
		target: '/api',
		domain: 'localhost',
		port: 8000
	},

	aliases: {
		'@h': '/src/html/',
		'@o': '/src/html/other/',
		'@c': '/src/html/components/',
		'@ui': '/src/html/components/UI/',
		'@j': '/src/js/',
		'@s': './src/scss/',
		'@i': '/src/assets/img/',
		'@ih': './src/assets/img/',
		'@icss': './src/assets/img/',
		'@v': '/src/assets/video/',
		'@f': '/src/assets/files/'
	},

	componentsImports: {
		html: ["<link rel='stylesheet' href='@c/{component}/{component}.scss'/>"],
		scss: []
	}
}