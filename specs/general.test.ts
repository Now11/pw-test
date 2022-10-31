import { expect } from '@playwright/test';
import { test } from '@test';

test.describe('User modal settings', async () => {
	test('User is able to change theme to Dark', async ({ page, directoryPage }) => {
		const DARK_MODE_COLOR = 'rgb(14, 14, 16)'; //#0e0e10

		await directoryPage.navigate();
		await directoryPage.waitForLoaded({ state: 'networkidle' });

		const userMenuPopup = await directoryPage.header.openUserMenu();
		await userMenuPopup.darkModeToggle.click();

		await directoryPage.waitForLoaded({ state: 'networkidle' });
		await page.waitForTimeout(1000);
		const isDarkMode = await userMenuPopup.getBodyColor();

		expect(isDarkMode, 'Wrong background color with Dark mode enabled').toEqual(DARK_MODE_COLOR);
	});
});
