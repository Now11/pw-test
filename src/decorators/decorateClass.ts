export function Log(target: Function): void {
	const classMethodNames = Object.getOwnPropertyNames(target.prototype)
		.filter((prop) => prop !== 'constructor' && prop !== 'fragment')
		.filter(
			(prop) =>
				!(
					'set' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor) ||
					'get' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor)
				),
		);

	classMethodNames.forEach((method) => {
		const originalMethod: Function = target.prototype[method];
		target.prototype[method] = async function (...args: any[]) {
			this.logger.info(`Call method ${method}`);
			return originalMethod.call(this, ...args);
		};
	});
}
