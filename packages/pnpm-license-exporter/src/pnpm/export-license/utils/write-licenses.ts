import { writeFileSync } from 'node:fs';

import { generateFlatPnpmPackages } from './generate-flat-pnpm-packages.util';
import { searchLicense } from './search-license.util';

export async function writeLicenses(licensesPath: string) {
  const licenses = await searchLicense(generateFlatPnpmPackages());
  writeFileSync(licensesPath, JSON.stringify(licenses, null, 2));
}
