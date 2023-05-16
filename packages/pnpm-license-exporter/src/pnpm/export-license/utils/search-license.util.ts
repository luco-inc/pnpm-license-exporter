import { readdir } from 'node:fs/promises';
import type { PnpmPackageInfo, PnpmPackageWithLicenseTxt } from '../types/export-licenses.types';
import { readLicense } from './read-license.util';

type PackageIfHasLicense = PnpmPackageWithLicenseTxt | PnpmPackageInfo;

export function searchLicense(packages: PnpmPackageInfo[]) {
  return Promise.all(
    packages
      .map(async (pnpmPackage): Promise<PackageIfHasLicense | undefined> => {
        const dirents = await readdir(pnpmPackage.path, { withFileTypes: true });
        const licenseDirent = dirents.find((dirent) => dirent.name.toLowerCase().includes('license'));
        if (licenseDirent === undefined) {
          return undefined;
        }
        const licenseTxt = await readLicense({
          name: pnpmPackage.name,
          licensePath: `${pnpmPackage.path}/${licenseDirent.name}`,
        });
        return licenseTxt === undefined ? pnpmPackage : { ...pnpmPackage, licenseTxt };
      })
      .filter(Boolean),
  ) as Promise<PackageIfHasLicense[]>;
}
