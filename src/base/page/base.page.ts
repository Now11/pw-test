import dotenv from 'dotenv';
import { Base } from './base';
import { BaseComponent } from './base.component';

dotenv.config();

export class BasePage extends Base {
	protected url = '';
	constructor() {
		super();
	}

	protected fragment<T extends BaseComponent | Base>(
		fragmentClass: new (selector: string, name: string) => T,
		selector: string,
		name: string,
	): T {
		return new fragmentClass(selector, name);
	}

	async navigate(
		options: { timeout: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' } = {
			timeout: 15000,
		},
	): Promise<void> {
		await page.goto(new URL(this.url, process.env.APP_URL).href, {
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
		await page.waitForLoadState(options?.state, { timeout: options?.timeout });
	}
}
