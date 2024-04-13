import { writeLicenses } from './write-licenses';
import { writeFile, mkdir } from 'node:fs/promises';
import { generateFlatPnpmPackages } from './generate-flat-pnpm-packages.util';
import { searchLicense } from './search-license.util';
import path from 'node:path';
import { mockPnpmPackages } from '../mocks/mock-pnpm-packages';
import { Mock } from 'vitest';

vi.mock('node:path', () => ({
  ...vi.importActual('node:path'),
  default: {
    dirname: vi.fn().mockReturnValue('src/licenses'),
  }
}));
vi.mock('node:fs/promises', () => ({
  ...vi.importActual('node:fs/promises'),
  writeFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('./generate-flat-pnpm-packages.util', () => ({
  generateFlatPnpmPackages: vi.fn().mockImplementation(()=> [
    mockPnpmPackages['Apache-2.0'][0],
    mockPnpmPackages.MIT[0],
    mockPnpmPackages.MIT[1],
  ])
}));
vi.mock('./search-license.util', () => ({
  searchLicense: vi.fn().mockResolvedValue([
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
  ]),
}));

test('should write licenses', async () => {
  await writeLicenses({});
  expect(generateFlatPnpmPackages).toHaveBeenCalledTimes(1);
  expect(generateFlatPnpmPackages).toHaveBeenCalledWith({
    dev: false,
    noOptional: false,
    noProd: false,
    recursive: false,
  });
  expect(searchLicense).toHaveBeenCalledTimes(1);
  expect(searchLicense).toHaveBeenCalledWith([
    mockPnpmPackages['Apache-2.0'][0],
    mockPnpmPackages.MIT[0],
    mockPnpmPackages.MIT[1],
  ]);
  expect(path.dirname).toHaveBeenCalledTimes(1);
  expect(path.dirname).toHaveBeenCalledWith('./licenses.json');
  expect(mkdir).toHaveBeenCalledTimes(1);
  expect(mkdir).toHaveBeenCalledWith('src/licenses', { recursive: true });
  expect(writeFile).toHaveBeenCalledTimes(1);
  expect(writeFile).toHaveBeenCalledWith('./licenses.json', JSON.stringify([
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
  ], undefined, undefined));
});

test('should not a make directory', async () => {
  (path.dirname as Mock).mockReturnValue('');
  await writeLicenses({});
  expect(mkdir).toHaveBeenCalledTimes(0);
})

test('should pretty', async () => {
  await writeLicenses({ pretty: true });
  expect(writeFile).toHaveBeenCalledWith('./licenses.json', JSON.stringify([
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
  ], undefined, 2));
})