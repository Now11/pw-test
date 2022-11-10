import { Locator } from 'playwright';
import { Base } from '@src/base';
import { element } from '@src/decorators';

class InputWithDropDown extends Base {
	@element({ name: 'Input' })
	protected input: Locator;
	@element({ name: 'DropDown results' })
	protected dropDownResults: Locator;

	constructor(selector: string, name: string) {
		super(name);
		this.container = page.locator(selector);
		this.input = this.container.locator('input');
		this.dropDownResults = this.container.locator('[data-test-selector="tag-search-search-content"]');
	}

	async setInputAndSelectValue(text: string) {
		await this.input.type(text);
		await this.dropDownResults.first().waitFor({ state: 'visible' });
		await this.dropDownResults.locator('button', { hasText: text }).click({ timeout: 5000 });
	}
}

export { InputWithDropDown };
