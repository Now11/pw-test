/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		node: true,
		jest: true,
		browser: true,
	},
	globals: {
		page: true,
		browser: true,
		context: true,
	},
	plugins: ['@typescript-eslint', 'prettier', 'no-only-tests'],
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
	rules: {
		'no-console': 1,
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
				printWidth: 120,
			},
		],
		'no-only-tests/no-only-tests': 'error',
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					String: false,
					Boolean: false,
					Number: false,
					Symbol: false,
					'{}': false,
					Object: false,
					object: false,
					Function: false,
				},
				extendDefaults: true,
			},
		],
	},
};

module.exports = config;
