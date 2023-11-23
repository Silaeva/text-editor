module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: 1,
    },
    extends: ['plugin:react/recommended', 'airbnb',],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
        quotes: 2,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
        }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react/prop-types': 0,
        '@typescript-eslint/no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
        }],
        'linebreak-style': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-max-props-per-line': [1, { maximum: 2 }],
    },
    overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            'no-undef': 'off',
        },
    }],
    globals: {
        __IS_DEV__: true,
    },
};
