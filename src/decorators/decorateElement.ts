/**
 * Just for Experements
 */

import { Logger } from 'log4js';
import { Locator } from 'playwright';

const possibleGetTextValues = ['innerText', 'textContent', 'inputValue'];

/**
 * Decorates Locator property. Overrides few core methods.
 * @param  {string} name - Web element name (e.g Save btn, Name input)
 */

function element({ name }: { name: string }) {
	return function (_target: { [x: string]: any }, prop: string) {
		let elem: Locator;
		const get = function (this: { [x: string]: any; set: (newValue: Locator) => void; get: () => any }) {
			const proxy = new Proxy(
				{ logger: this.logger as Logger },
				{
					get(target, fnName: keyof Locator, _r) {
						/* Exclude utility methods from logs */
						if (fnName.includes('_')) {
							return elem[fnName];
						}

						if (fnName.toLowerCase().includes('locator')) {
							return elem[fnName];
						}

						if (fnName.includes('toString')) {
							return elem[fnName];
						}

						/* Override get Text methods (can be changed) */
						if (possibleGetTextValues.some((name) => name.includes(fnName))) {
							target.logger.info(`Get text from "${name}"`);
							return elem[fnName];
						}

						if (fnName.includes('click')) {
							target.logger.info(`Click on ${name}`);
							return elem[fnName];
						}

						if (fnName.includes('isVisible')) {
							target.logger.info(`Wait for ${name} to be Visible`);
							return async (...args: any[]): Promise<boolean> => {
								try {
									await elem.waitFor({ state: 'visible', timeout: 10000 });
									return elem['isVisible'](...args);
								} catch (error) {
									return elem['isVisible'](...args);
								}
							};
						}
						target.logger.info(`"${name}" call "${fnName}" method`);
						return elem[fnName];
					},
				},
			);

			return proxy;
		};

		const set = function (newValue: Locator) {
			elem = newValue;
		};

		Object.defineProperty(_target, prop, { set, get });
	};
}

export { element };
