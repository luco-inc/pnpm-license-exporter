import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        statements: 98.74,
        branches: 81.25,
        functions: 100,
        lines: 98.74,
        autoUpdate: true,
      },
      exclude: ['**/*/index.ts', '**/*/*.types.ts', '**/*/*.d.ts', '**/*/*.js','*.cjs', 'apps', 'src/bin', '**/const/*.*'],
    },
    clearMocks: true,
  },
});
