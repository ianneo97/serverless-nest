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
        'plugin:jest/recommended',
        'plugin:jest/style',
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
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variableLike',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T'],
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
