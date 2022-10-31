import { chromium, webkit, firefox, test as base, Browser } from '@playwright/test';

let test = base;

if (process.env.MOON_WS) {
	test = base.extend<{}>({
		browser: async ({}, use) => {
			let vBrowser: Browser;
			if (process.env.BROWSER_TYPE === 'chrome') {
				vBrowser = await chromium.connect(
					`${process.env.MOON_WS}:4444/playwright/chrome?headless=true&enableVideo=false`,
					{
						timeout: 120000,
					},
				);
			}

			if (process.env.BROWSER_TYPE === 'safari') {
				vBrowser = await webkit.connect(
					`${process.env.MOON_WS}:4444/playwright/safari?headless=true&enableVideo=false`,
					{
						timeout: 120000,
					},
				);
			}

			if (process.env.BROWSER_TYPE === 'firefox') {
				vBrowser = await firefox.connect(
					`${process.env.MOON_WS}:4444/playwright/firefox?headless=true&enableVideo=false`,
					{
						timeout: 120000,
					},
				);
			}

			await use(vBrowser);
			await vBrowser.close();
		},
	});
}

export { test };
