import { Locator } from 'playwright';
import { BaseComponent } from '@src/base';
import { UserMenuPopup } from '@src/popups';

class HeaderFragment extends BaseComponent {
	private readonly openUserMenuIcon: Locator;
	constructor() {
		super('Header');
		this.container = page.locator('[data-a-target="top-nav-container"]');
		this.openUserMenuIcon = this.container.locator('[data-test-selector="user-menu__toggle"]');
	}

	async openUserMenu() {
		this.logger.info('Open User menu');
		await this.openUserMenuIcon.click();
		return new UserMenuPopup();
	}
}
export { HeaderFragment };
