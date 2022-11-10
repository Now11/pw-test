import { Locator } from 'playwright';
import log4js from 'log4js';
import { Logger } from '../logger';

/**
 * @class Base class
 * @description Abstract Base class
 */

export abstract class Base {
	protected name: string;
	protected container: Locator;
	protected logger: log4js.Logger;

	constructor(name?: string) {
		this.name = name ?? this.constructor.name;
		this.container = page.locator('html');
		this.logger = Logger.init(this.name);
	}
}
