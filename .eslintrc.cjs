/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    "@typescript-eslint/no-unused-vars": "off",
  },
  overrides: [
    {
      files: ['**/*.test.tsx', '**/*.test.ts'],
      plugins: ["vitest"],
      rules: {
        'vitest/require-top-level-describe': 'off',
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
