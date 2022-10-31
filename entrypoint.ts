import { DirectoryPage } from '@src/pages';
import { test as base } from './moon.config';

interface IPageObjectFixture {
	directoryPage: DirectoryPage;
}

const test = base.extend<IPageObjectFixture>({
	directoryPage: async ({ page }, use) => {
		const directoryPage = new DirectoryPage(page);
		await use(directoryPage);
	},
});

export { test };
