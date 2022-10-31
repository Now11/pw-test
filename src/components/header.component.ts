import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@src/base';
import { UserMenuPopup } from '@src/popups';

class HeaderFragment extends BaseComponent {
	private readonly openUserMenuIcon: Locator;
	constructor(page: Page) {
		super(page, 'Header');
		this.container = this.page.locator('[data-a-target="top-nav-container"]');
		this.openUserMenuIcon = this.container.locator('[data-test-selector="user-menu__toggle"]');
	}

	async openUserMenu() {
		await this.openUserMenuIcon.click();
		return new UserMenuPopup(this.page);
	}
}
export { HeaderFragment };
