import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/base';

class UserMenuPopup extends BaseComponent {
	readonly darkModeToggle: Locator;
	readonly loginBtn: Locator;

	constructor(page: Page) {
		super(page, 'User Menu Popup');
		this.container = this.page.locator('.user-menu-dropdown__main-menu');
		this.darkModeToggle = this.container.locator('[data-test-selector="user-menu__dark-mode-toggle"]');
		this.loginBtn = this.container.locator('[data-test-selector="user-menu__logout-button"]');
	}

	async getBodyColor() {
		return this.page
			.locator('body')
			.evaluate((element) => window.getComputedStyle(element).getPropertyValue('background-color'));
	}
}

export { UserMenuPopup };
