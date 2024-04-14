import { mockPnpmPackages } from '../mocks/mock-pnpm-packages';
import { searchLicense } from './search-license.util';
import { findLicenseDirent } from './find-license-dirent';
import { buildExportedPnpmPackageInfo } from './build-exported-pnpm-package-info';
import { readLicense } from './read-license.util';
import { Mock } from 'vitest';
import { nextLicense } from '../../../license-txt';

vitest.mock('./find-license-dirent', () => ({
  findLicenseDirent: vitest.fn().mockResolvedValue({
    name: 'LICENSE.md',
    parentPath: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/',
    path: '/Users/mock/luco-inc/pnpm-license-exporter/node_modules/.pnpm/vitest@1.5.0_@types+node@20.12.7/node_modules/vitest/'
  })
}));

vitest.mock('./build-exported-pnpm-package-info', () => ({
  buildExportedPnpmPackageInfo: vitest.fn().mockImplementation(()=> ({
    name: '@ampproject/remapping',
    version: '2.2.0',
    license: 'Apache-2.0',
    author: 'Justin Ridgewell',
    homepage: 'https://github.com/ampproject/remapping#readme',
    description: 'Remap sequential sourcemaps through transformations to point at the original source code',
  }))
}));

vitest.mock('./read-license.util', () => ({
  readLicense: vitest.fn().mockResolvedValue(undefined)
}));

test('should return licenses', async () => {
  expect(await searchLicense([
    mockPnpmPackages['Apache-2.0'][0],
    mockPnpmPackages.MIT[0],
    mockPnpmPackages.MIT[1],
  ])).toStrictEqual([
    {
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    },
    {
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    },
    {
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    },
  ])
  expect(findLicenseDirent).toHaveBeenCalledTimes(3);
  expect(readLicense).toHaveBeenCalledTimes(3);
  expect(buildExportedPnpmPackageInfo).toHaveBeenCalledTimes(3);
});

test('should using pnpm package in args', async () => {
  (readLicense as Mock).mockResolvedValue(nextLicense);
  (buildExportedPnpmPackageInfo as Mock).mockResolvedValue({
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
      licenseTxt: nextLicense,
  });

  expect(await searchLicense([mockPnpmPackages['Apache-2.0'][0]])).toStrictEqual([
    {
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
      licenseTxt: nextLicense,
    }
  ]);
  expect(findLicenseDirent).toHaveBeenCalledTimes(1);
  expect(findLicenseDirent).toHaveBeenCalledWith('/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping');
  expect(readLicense).toHaveBeenCalledTimes(1);
  expect(readLicense).toHaveBeenCalledWith({
    name: '@ampproject/remapping',
    licensePath: '/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping/LICENSE.md',
  });
  expect(buildExportedPnpmPackageInfo).toHaveBeenCalledTimes(1);
  expect(buildExportedPnpmPackageInfo).toHaveBeenCalledWith({
    name: '@ampproject/remapping',
    version: '2.2.0',
    license: 'Apache-2.0',
    author: 'Justin Ridgewell',
    homepage: 'https://github.com/ampproject/remapping#readme',
    description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    path: "/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping"
  }, nextLicense);
})