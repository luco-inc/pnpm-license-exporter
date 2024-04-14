import { nextLicense } from '../../../license-txt';
import { buildExportedPnpmPackageInfo } from './build-exported-pnpm-package-info';

test('should return package info without licenseTxt', () => {
  expect(buildExportedPnpmPackageInfo({
      name: '@ampproject/remapping',
      version: '2.2.0',
      path: '/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    }, undefined)).toStrictEqual({
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
  });
});

test('should return package info with licenseTxt', () => {
    expect(buildExportedPnpmPackageInfo({
      name: '@ampproject/remapping',
      version: '2.2.0',
      path: '/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    }, nextLicense)).toStrictEqual({
      name: '@ampproject/remapping',
      version: '2.2.0',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
      licenseTxt: nextLicense,
  });
});