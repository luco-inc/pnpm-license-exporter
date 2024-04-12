import { execSync } from 'node:child_process';
import { Mock } from 'vitest';
import { generateFlatPnpmPackages } from './generate-flat-pnpm-packages.util';
import { mockPnpmPackages } from '../mocks/mock-pnpm-packages';

vi.mock('node:child_process');

test('should return packages', () => {
  (execSync as Mock).mockReturnValue(JSON.stringify(mockPnpmPackages));
  expect(generateFlatPnpmPackages()).toStrictEqual([
    mockPnpmPackages['Apache-2.0'][0],
    mockPnpmPackages.MIT[0],
    mockPnpmPackages.MIT[1],
  ]);
});
