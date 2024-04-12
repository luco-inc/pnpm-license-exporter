import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        statements: 83.99,
        branches: 38.88,
        functions: 25,
        lines: 83.99,
        autoUpdate: true,
      },
    },
    clearMocks: true,
  },
});