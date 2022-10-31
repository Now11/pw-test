import { expect, Locator, Page } from '@playwright/test';
import { Base } from '@src/base';

class InputWithDropDown extends Base {
	protected input: Locator;
	protected dropDownResults: Locator;

	constructor(page: Page, selector: string, name: string) {
		super(page, name);
		this.container = this.page.locator(selector);
		this.input = this.container.locator('input');
		this.dropDownResults = this.container.locator('[data-test-selector="tag-search-search-content"]');
	}

	async setInputAndSelectValue(text: string) {
		await this.input.type(text);
		await expect(this.dropDownResults.first()).toBeVisible({ timeout: 5000 });
		await this.dropDownResults.locator('button', { hasText: text }).click({ timeout: 5000 });
	}
}

export { InputWithDropDown };
