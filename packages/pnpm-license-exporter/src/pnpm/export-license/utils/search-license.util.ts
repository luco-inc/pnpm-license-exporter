import { readdir } from 'node:fs/promises';
import type { PnpmPackageInfo, ExportedPnpmPackageInfo } from '../types/export-licenses.types';
import { readLicense } from './read-license.util';

export function searchLicense(packages: PnpmPackageInfo[]) {
  return Promise.all(
    packages.map(async (pnpmPackage): Promise<ExportedPnpmPackageInfo | undefined> => {
      const dirents = await readdir(pnpmPackage.path, { withFileTypes: true });
      const licenseDirent = dirents.find((dirent) => dirent.name.toLowerCase().includes('license'));
      if (licenseDirent === undefined) {
        return undefined;
      }
      const licenseTxt = await readLicense({
        name: pnpmPackage.name,
        licensePath: `${pnpmPackage.path}/${licenseDirent.name}`,
      });
      // remove path property
      const { path, ...PnpmPackageInfo } = pnpmPackage;
      return licenseTxt === undefined ? PnpmPackageInfo : { ...PnpmPackageInfo, licenseTxt };
    }),
  ).then((licenses) => licenses.filter(Boolean));
}
