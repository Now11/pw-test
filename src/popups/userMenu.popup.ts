import { Locator } from 'playwright';
import { BaseComponent } from '@src/base';
import { element } from '@src/decorators';

class UserMenuPopup extends BaseComponent {
	@element({ name: 'Dark Mode toggle' })
	readonly darkModeToggle: Locator;
	@element({ name: 'Login Btn' })
	readonly loginBtn: Locator;

	constructor() {
		super('User Menu Popup');
		this.container = page.locator('.user-menu-dropdown__main-menu');
		this.darkModeToggle = this.container.locator('[data-test-selector="user-menu__dark-mode-toggle"]');
		this.loginBtn = this.container.locator('[data-test-selector="user-menu__logout-button"]');
	}

	async getBodyColor() {
		this.logger.info('Get Body background-color');
		return page
			.locator('body')
			.evaluate((element) => window.getComputedStyle(element).getPropertyValue('background-color'));
	}
}

export { UserMenuPopup };
