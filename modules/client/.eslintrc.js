const path = require("path");

module.exports = {
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript',
        'airbnb',
        'prettier'
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [ path.resolve(__dirname, './tsconfig.json') ]
    },
    plugins: [
        'react',
        'jest',
        'prettier',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.jsx', '.ts', '.tsx'] 
        }],
        'arrow-body-style': 'off',
        'react/function-component-definition': [2, {
            namedComponents: 'arrow-function'
        }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'max-len': ["error", { "code": 80 }],
        '@typescript-eslint/naming-convention': [
            "error",
            {
              "selector": "interface",
              "format": ["PascalCase"],
              "custom": {
                "regex": "^I[A-Z]",
                "match": true
              }
            }
          ]
    },
    settings: {
        'import/resolver': {
            node: {
                paths: [
                    path.resolve(__dirname, 'src')
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    ignorePatterns: ['reportWebVitals.ts']
}
