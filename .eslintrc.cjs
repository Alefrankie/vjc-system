module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:all', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'one-var': 'off',
		'sort-keys': 'off',
		'id-length': 'off',
		'no-underscore-dangle': 'off',
		'no-magic-numbers': 'off',
		'sort-imports': 'off',
		'capitalized-comments': 'off',
		'multiline-comment-style': 'off',
		'no-negated-condition': 'off',
		'no-ternarny': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'func-style': 'off',
		'no-shadow': 'off',
		'arrow-body-style': 'off',
		'no-ternary': 'off'
	}
}
