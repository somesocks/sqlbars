module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: require.resolve('./tsconfig.json'),
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
	],
	extends: [
		'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
};
