module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "react-hooks",
    "testing-library",
    "jest",
  ],
  rules: {
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-param-reassign": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // temp rule
    'no-useless-constructor': 'off',
    'react/prefer-stateless-function': 'off',
    // END temp rule
    'class-methods-use-this': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    quotes: 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-spacing': ['error', 'always'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-else-return': 'warn',
    'prefer-const': 'warn',
    'no-use-before-define': 'off',
    'object-curly-newline': [
      'error',
      { multiline: true },
    ],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'switch', 'if', 'for', 'while'],
      },
      {
        blankLine: 'always',
        prev: ['if', 'switch', 'for', 'while'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'max-classes-per-file': 'off',
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
