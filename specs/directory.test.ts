import { DirectoryPage } from '@src/pages';

describe('Directions - Filter', () => {
	const directoryPage = new DirectoryPage();

	test('All cards must match filtered tag [1]', async () => {
		const FILTERED_TAG = 'MMO';

		await directoryPage.navigate();
		await directoryPage.waitForLoaded({ state: 'networkidle' });

		await directoryPage.filterByCategory.setInputAndSelectValue(FILTERED_TAG);
		await page.waitForLoadState('networkidle');
		await page.waitForTimeout(2000);

		const items = await directoryPage.getGamesInfo();

		items.forEach((item) => {
			const { tags } = item;
			expect(tags, 'Wrong tag assigned to game card').toContain(FILTERED_TAG);
		});
	});

	test('Failed test [4]', async () => {
		expect(true).toBeFalsy();
	});
});
