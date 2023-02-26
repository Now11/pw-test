/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 *
 * @type {ESLintConfig}
 */

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
		'no-missing-testcase-id': 'error',
		// 'no-only-tests/no-only-tests': 'error',
		// '@typescript-eslint/no-namespace': 'off',
		// 'no-restricted-syntax': [
		//   'error',
		//   {
		//     // eslint-disable-next-line
		//     selector:'CallExpression[callee.name="describe"][arguments.0.quasis.0.value.raw=/^(?:(?!\\[\\d+\\]).)*$/s]:has(CallExpression > CallExpression[callee.name="it"]) CallExpression[callee.name="it"][arguments.0.quasis.0.value.raw=/^(?:(?!\\[\\d+\\]).)*$/s] ', // prettier-ignore
		//     message: 'Missing [test_case_id] in the Title'
		//   }
		// ]
	},
};

module.exports = config;
