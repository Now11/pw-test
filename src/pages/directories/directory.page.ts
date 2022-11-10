import { BasePage } from '@src/base';
import { Locator } from 'playwright';
import { HeaderFragment } from '@src/components';
import { InputWithDropDown } from '@src/elements';

interface IGameCardIfon {
	tags: string[];
	name: string;
}

class DirectoryPage extends BasePage {
	readonly header: HeaderFragment;
	readonly filterByCategory: InputWithDropDown;
	private readonly gameCards: Locator;
	private readonly cardTitleSelector: string;
	private readonly cardTagsSelector: string;

	constructor() {
		super();
		this.url = '/directory';
		this.header = this.fragment(HeaderFragment, '.top-nav__menu', 'Header ');
		this.filterByCategory = this.fragment(
			InputWithDropDown,
			'[data-test-selector="tag-search-wrapper-selector"]',
			'Filter By Category',
		);
		this.gameCards = this.container.locator('[data-target="directory-page__card-container"]');
		this.cardTitleSelector = '[data-a-target="tw-card-title"]';
		this.cardTagsSelector = '.tw-tag';
	}

	async getGamesInfo() {
		this.logger.info('Get games cards info');
		const itemsInfo: IGameCardIfon[] = [];
		for (let i = 0; i < (await this.gameCards.count()); i++) {
			const cardName = await this.gameCards.nth(i).locator(this.cardTitleSelector).innerText();
			const cardTags = this.gameCards.nth(i).locator(this.cardTagsSelector);

			const tags: string[] = [];

			for (let j = 0; j < (await cardTags.count()); j++) {
				const tag = await cardTags.nth(j).innerText();
				tags.push(tag);
			}
			itemsInfo.push({ name: cardName, tags });
		}
		return itemsInfo;
	}
}

export { DirectoryPage };
