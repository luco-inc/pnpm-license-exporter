import { execSync } from 'node:child_process';

import type { PnpmLicenses, PnpmPackageInfo } from '../types/export-licenses.types';

export function generateFlatPnpmPackages(): PnpmPackageInfo[] {
  try {
    const pnpmRawCommandResultString = execSync(
      'pnpm licenses ls --json --prod --recursive'
    ).toString('utf8');
    if (pnpmRawCommandResultString === 'No licenses in packages found\n') {
      console.warn(
        '\u001b[33mWARN\u001b[0m: Skipping license export because No licenses in packages found'
      );
      return [];
    }
    const pnpmRawCommandResult = JSON.parse(
      execSync('pnpm licenses ls --json --prod --recursive').toString('utf8')
    ) as unknown as PnpmLicenses;

    const packagesCollection = new Map<string, PnpmPackageInfo[]>(
      Object.entries(pnpmRawCommandResult)
    );
    return [...packagesCollection.values()].flat();
  } catch (error) {
    console.error(
      '\u001b[31mError\u001b[0m: Error while executing pnpm licenses ls --json --prod --recursive'
    );
    console.error(error);
    process.exit(1);
  }
}
