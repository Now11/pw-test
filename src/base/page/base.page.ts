import config from '../../../playwright.config';
import { Page } from '@playwright/test';
import { Base } from './base';
import { BaseComponent } from './base.component';

export class BasePage extends Base {
	protected url = '';

	constructor(page: Page) {
		super(page);
	}

	protected fragment<T extends BaseComponent | Base>(
		fragmentClass: new (page: Page, selector: string, name: string) => T,
		selector: string,
		name?: string,
	): T {
		return new fragmentClass(this.page, selector, name);
	}

	async navigate(
		options: { timeout: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' } = {
			timeout: 15000,
		},
	): Promise<void> {
		await this.page.goto(new URL(this.url, config.use.baseURL).href, {
			timeout: options?.timeout,
			waitUntil: options?.waitUntil ?? 'domcontentloaded',
		});
	}

	async waitForLoaded(
		options: {
			timeout?: number;
			state?: 'load' | 'domcontentloaded' | 'networkidle';
		} = { timeout: 15000, state: 'domcontentloaded' },
	): Promise<void> {
		await this.page.waitForLoadState(options?.state, { timeout: options?.timeout });
	}
}
