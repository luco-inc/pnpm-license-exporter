import { execSync } from 'node:child_process';

import type { PnpmLicenses, PnpmPackageInfo } from '../types/export-licenses.types';

export function generateFlatPnpmPackages(): PnpmPackageInfo[] {
  const pnpmRawCommandResult = JSON.parse(
    execSync('pnpm licenses ls --json --prod --recursive').toString('utf8'),
  ) as unknown as PnpmLicenses;
  const packagesCollection = new Map<string, PnpmPackageInfo[]>(Object.entries(pnpmRawCommandResult));
  return [...packagesCollection.values()].flat();
}
