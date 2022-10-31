import { Locator, Page } from '@playwright/test';
import { Base } from './base';

/**
 * @class BaseFragment class
 * @description Creates simple fragmet of the page
 */

class BaseComponent extends Base {
	protected container: Locator;
	protected rootSelector: string;

	constructor(page: Page, name?: string, selector?: string) {
		super(page, name);
		this.rootSelector = selector;
		this.container = this.page.locator(this.rootSelector);
	}

	async waitForVisible(options: { timeout: number } = { timeout: 10000 }): Promise<boolean> {
		await this.container.waitFor({ state: 'visible', timeout: options.timeout });
		return this.container.isVisible();
	}
}

export { BaseComponent };
