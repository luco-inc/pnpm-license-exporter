import { readFile } from 'node:fs/promises';
import { Mock } from 'vitest';
import { readLicense } from './read-license.util';
import { toggleSectionLicense } from '../../../license-txt';

vi.mock('fs/promises');

test('should exec readFile', async () => {
  (readFile as Mock).mockReturnValue(`
    mockLicense TXT
  `);
  const license = await readLicense({ licensePath: 'mockLicensePath', name: 'mock-mock-mock' });
  expect(readFile).toHaveBeenCalledTimes(1);
  expect(readFile).toHaveBeenCalledWith('mockLicensePath', {
    encoding: 'utf8',
  });
  expect(license).toBe(`
    mockLicense TXT
  `);
});

test('should return undefined', async () => {
  const originalConsoleError = console.error;
  const mockConsoleError = vi.fn();
  console.error = mockConsoleError;
  (readFile as Mock).mockRejectedValue(new Error('mockError'));
  const license = await readLicense({ licensePath: 'mockLicensePath', name: 'mock-mock-mock' });
  expect(mockConsoleError).toHaveBeenCalledTimes(1);
  expect(mockConsoleError).toHaveBeenCalledWith(new Error('mockError'));
  expect(license).toBe(undefined);
  console.error = originalConsoleError;
});

test('should return force loaded license', async () => {
  const license = await readLicense({ licensePath: 'mockLicensePath', name: 'toggle-selection' });
  expect(readFile).toHaveBeenCalledTimes(0);
  expect(license).toBe(toggleSectionLicense);
});
