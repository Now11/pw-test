/** @type {import('jest-playwright-preset').JestPlaywrightConfig} */
const config = {
	browsers: ['chromium'],
	exitOnPageError: false,
	launchOptions: {
		args: [
			'--disable-popup-blocking',
			'--allow-popups-during-page-unload',
			'--window-size=1920,1080',
			'--allow-insecure-localhost',
			'--enable-features=NativeFileSystemAPI',
		],
		headless: process.env.HEADLESS === 'false' ? false : true,
		downloadsPath: './tmp',
	},
	maxInstances: 4,
	contextOptions: {
		displayHeaderFooter: true,
		ignoreHTTPSErrors: true,
		viewport: null,
		acceptDownloads: true,
		timezoneId: 'Etc/UCT',
	},
};

module.exports = config;
