import dotenv from 'dotenv';
import { PlaywrightTestConfig } from '@playwright/test';

dotenv.config();

const config: PlaywrightTestConfig = {
	use: {
		actionTimeout: 30000,
		baseURL: process.env.APP_URL,
		headless: Boolean(process.env.HEADLESS) || true,
		channel: process.env.BROWSER_TYPE || 'chrome',
		viewport: { width: 1600, height: 960 },
		screenshot: 'only-on-failure',
	},
	testMatch: process.env.TESTS_PATH || '**/*.test.[jt]s?(x)',
	testDir: './specs',
	reporter: [['list']],
	workers: Number(process.env.WORKER_NUMBER) || 1,
	timeout: 180000, // 3min,
};

if (process.env.LOG === 'trace') {
	config.use!.trace = 'retain-on-failure';
}

export default config;
