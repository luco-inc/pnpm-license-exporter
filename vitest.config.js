/** @type import('vitest/config').UserConfigExport */
module.exports = {
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'c8',
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
      thresholdAutoUpdate: true,
    },
    clearMocks: true,
  },
};
