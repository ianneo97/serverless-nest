module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'jest', 'node', 'security'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:security/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/semi': 'warn',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        'security/detect-object-injection': 'warn',
        'no-var': 'error',
        'no-console': 'warn',
        camelcase: 'off',
        curly: 'warn',
        eqeqeq: 'warn',
        'no-throw-literal': 'warn',
        semi: 'off',
        'no-empty': 'warn',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'no-use-before-define': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
            },
        ],
    },
};
