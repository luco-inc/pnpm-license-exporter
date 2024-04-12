import { execSync } from 'node:child_process';

import type { PnpmLicenses, PnpmPackageInfo } from '../types/export-licenses.types';

type argsType = { recursive: boolean; dev: boolean; noProd: boolean; noOptional: boolean };

export function generateFlatPnpmPackages({
  recursive,
  dev,
  noProd,
  noOptional,
}: argsType): PnpmPackageInfo[] {
  try {
    if (noProd && !dev) {
      console.warn(
        '\u001b[33mWARN\u001b[0m: Skipping license export because both dev and prod are set to false'
      );
      return [];
    }
    const pnpmRawCommandResultString = execSync(
      `pnpm licenses ls --json ${recursive ? '--recursive ' : ''}${noOptional ? '--no-optional ' : ''}${!noProd && dev ? '' : !noProd && !dev ? '--prod' : dev && noProd ? '--dev' : ''}`
    ).toString('utf8');
    if (pnpmRawCommandResultString === 'No licenses in packages found\n') {
      console.warn(
        '\u001b[33mWARN\u001b[0m: Skipping license export because No licenses in packages found'
      );
      return [];
    }
    const pnpmRawCommandResult = JSON.parse(pnpmRawCommandResultString) as unknown as PnpmLicenses;

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
