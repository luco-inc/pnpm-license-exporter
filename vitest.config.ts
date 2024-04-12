import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        statements: 76.66,
        branches: 50,
        functions: 25,
        lines: 76.66,
        autoUpdate: true,
      },
    },
    clearMocks: true,
  },
});
