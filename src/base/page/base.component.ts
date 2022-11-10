import { Locator } from 'playwright';
import { Base } from './base';

class BaseComponent extends Base {
	protected container: Locator;
	protected rootSelector?: string;

	constructor(name: string, selector?: string) {
		super(name);
		this.rootSelector = selector;
		this.container = page.locator(this.rootSelector ?? 'body');
	}

	async waitForVisible(options: { timeout: number } = { timeout: 10000 }): Promise<boolean> {
		await this.container.waitFor({ state: 'visible', timeout: options.timeout });
		return this.container.isVisible();
	}
}

export { BaseComponent };
