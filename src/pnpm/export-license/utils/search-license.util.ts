import type { PnpmPackageInfo, ExportedPnpmPackageInfo } from '../types/export-licenses.types';
import { readLicense } from './read-license.util';
import { findLicenseDirent } from './find-license-dirent';
import { buildExportedPnpmPackageInfo } from './build-exported-pnpm-package-info';

export function searchLicense(
  packages: PnpmPackageInfo[]
): Promise<(ExportedPnpmPackageInfo | undefined)[]> {
  return Promise.all(
    packages.map(async (pnpmPackage): Promise<ExportedPnpmPackageInfo | undefined> => {
      if (!pnpmPackage.path) {
        return undefined;
      }
      const licenseDirent = await findLicenseDirent(pnpmPackage.path);
      if (licenseDirent === undefined) {
        return undefined;
      }
      const licenseTxt = await readLicense({
        name: pnpmPackage.name,
        licensePath: `${pnpmPackage.path}/${licenseDirent.name}`,
      });
      return buildExportedPnpmPackageInfo(pnpmPackage, licenseTxt);
    })
  ).then((licenses) => licenses.filter(Boolean));
}
