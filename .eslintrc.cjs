module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:svelte/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['*.cjs'],
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        }
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    },
    rules: {
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-unused-vars': [
            'warn', // or "error"
            {
                argsIgnorePattern: '_',
                varsIgnorePattern: '_',
                caughtErrorsIgnorePattern: '_',
                ignoreRestSiblings: true
            }
        ],
        '@typescript-eslint/no-explicit-any': 'warn'
    }
};
