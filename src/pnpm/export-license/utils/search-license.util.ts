import type { PnpmPackageInfo, ExportedPnpmPackageInfo } from '../types/export-licenses.types';
import { readLicense } from './read-license.util';
import { findLicenseDirent } from './find-license-dirent';
import { buildExportedPnpmPackageInfo } from './build-exported-pnpm-package-info';

export function searchLicense(
  packages: PnpmPackageInfo[]
): Promise<(ExportedPnpmPackageInfo | undefined)[]> {
  return Promise.all(
    packages.map(
      async (
        pnpmPackage
      ): Promise<ExportedPnpmPackageInfo | undefined | (ExportedPnpmPackageInfo | undefined)[]> => {
        if (pnpmPackage.paths) {
          return await Promise.all(
            pnpmPackage.paths.map(async (path, index) => {
              const licenseDirent = await findLicenseDirent(path);
              if (licenseDirent === undefined) {
                return undefined;
              }
              const licenseTxt = await readLicense({
                name: pnpmPackage.name,
                licensePath: `${path}/${licenseDirent.name}`,
              });
              return buildExportedPnpmPackageInfo(
                {
                  ...pnpmPackage,
                  version: pnpmPackage.versions
                    ? pnpmPackage.versions[index]
                      ? pnpmPackage.versions[index]
                      : pnpmPackage.versions[0]
                    : pnpmPackage.version,
                },
                licenseTxt
              );
            })
          );
        } else if (pnpmPackage.path) {
          const licenseDirent = await findLicenseDirent(pnpmPackage.path);
          if (licenseDirent === undefined) {
            return undefined;
          }
          const licenseTxt = await readLicense({
            name: pnpmPackage.name,
            licensePath: `${pnpmPackage.path}/${licenseDirent.name}`,
          });
          return buildExportedPnpmPackageInfo(pnpmPackage, licenseTxt);
        } else {
          return undefined;
        }
      }
    )
  ).then((licenses) => {
    const li = licenses.flat();
    return li.filter(Boolean);
  });
}
