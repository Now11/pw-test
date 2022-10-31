import { Locator, Page } from '@playwright/test';
import log4js from 'log4js';
import { Logger } from '../logger';

export abstract class Base {
	protected readonly page: Page;
	protected name: string;
	protected container: Locator;
	protected logger: log4js.Logger;

	constructor(page: Page, name?: string) {
		this.page = page;
		this.name = name ?? this.constructor.name;
		this.container = this.page.locator('html');
		this.logger = Logger.init(this.name);
	}
}
