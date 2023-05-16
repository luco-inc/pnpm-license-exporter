/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  env: {
    node: true,
    'vitest-globals/env': true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vitest/all',
    'plugin:vitest-globals/recommended',
    'prettier',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'vitest/require-top-level-describe': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.tsx', '**/*.test.ts'],
      rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  ignorePatterns: ['*.js', '*.mjs', '**/dist'],
};
