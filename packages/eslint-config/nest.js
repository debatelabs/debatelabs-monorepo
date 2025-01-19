import globals from 'globals';
import * as eslintPluginNest from 'eslint-plugin-nestjs';
import baseConfig from '@repo/eslint-config/base';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest
			}
		}
	},
	{
		plugins: {
			nestjs: eslintPluginNest
		}
	},
	{
		rules: {
			'nestjs/use-validation-pipe': 'warn',
			'prefer-const': 'error',
			'@typescript-eslint/explicit-member-accessibility': ['error', {
				accessibility: 'explicit',
				overrides: {
					constructors: 'no-public'
				}
			}]
		}
	}
];
