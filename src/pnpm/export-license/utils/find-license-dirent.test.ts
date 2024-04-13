import { Mock } from 'vitest';
import { findLicenseDirent } from './find-license-dirent';
import { readdir } from 'node:fs/promises';

vitest.mock('node:fs/promises', () => ({
  readdir: vitest.fn().mockResolvedValue([
    {
      name: 'LICENSE.md',
      parentPath: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
      path: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
    },
    {
      name: 'README.md',
      parentPath: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
      path: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
    }
  ])
}));

test('should return license dirent', async () => {
  expect(await findLicenseDirent('/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest')).toStrictEqual({
    name: 'LICENSE.md',
    parentPath: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
    path: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/'
  });
});

test('should return undefined', async () => {
  (readdir as Mock).mockResolvedValue([{
    name: 'README.md',
    parentPath: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
    path: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
  }]);
  expect(await findLicenseDirent('/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest')).toBe(undefined);
});