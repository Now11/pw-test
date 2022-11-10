// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

/** @type {import('jest').Config} */
const config = {
	verbose: true,
	preset: 'jest-playwright-preset',
	testMatch: [`${process.env.TESTS_PATH || '**/*.test.[jt]s?(x)'}`],
	transform: {
		'^.+\\.(ts)$': 'ts-jest',
	},
	testTimeout: 360000,
	testResultsProcessor: 'jest-junit',
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
	reporters: [
		'default',
		[
			'jest-junit',
			{
				outputDirectory: './reports',
				outputName: 'test-report.xml',
			},
		],
	],
	maxWorkers: 1,
	moduleDirectories: ['node_modules', 'src', 'specs'],
	moduleNameMapper: {
		'@src/(.*)': '<rootDir>/src/$1',
		'@api/(.*)': '<rootDir>/api/$1',
	},
	setupFilesAfterEnv: ['./src/utils/customMessage'],
};

module.exports = config;
