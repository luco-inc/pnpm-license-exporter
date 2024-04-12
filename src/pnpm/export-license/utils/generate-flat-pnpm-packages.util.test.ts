import { execSync } from 'node:child_process';
import { Mock } from 'vitest';
import { generateFlatPnpmPackages } from './generate-flat-pnpm-packages.util';
import { mockPnpmPackages } from '../mocks/mock-pnpm-packages';

vi.mock('node:child_process');

test('should return packages', () => {
  (execSync as Mock).mockReturnValue(JSON.stringify(mockPnpmPackages));
  expect(
    generateFlatPnpmPackages({
      recursive: true,
      dev: false,
      noProd: true,
      noOptional: false,
    })
  ).toStrictEqual([
    mockPnpmPackages['Apache-2.0'][0],
    mockPnpmPackages.MIT[0],
    mockPnpmPackages.MIT[1],
  ]);
});

test('should return empty array when no packages found', () => {
  (execSync as Mock).mockReturnValue('No licenses in packages found\n');
  expect(
    generateFlatPnpmPackages({
      recursive: true,
      dev: false,
      noProd: false,
      noOptional: false,
    })
  ).toStrictEqual([]);
});

test('should return empty array when both dev and prod are false', () => {
  (execSync as Mock).mockReturnValue(JSON.stringify(mockPnpmPackages));
  expect(
    generateFlatPnpmPackages({
      recursive: true,
      dev: false,
      noProd: true,
      noOptional: false,
    })
  ).toStrictEqual([]);
});
