import type { PnpmPackageInfo, ExportedPnpmPackageInfo } from '../types/export-licenses.types';

export function buildExportedPnpmPackageInfo(
  pnpmPackage: PnpmPackageInfo,
  licenseTxt: undefined | string
): ExportedPnpmPackageInfo {
  // remove path property
  const { path, paths, ...PnpmPackageInfo } = pnpmPackage;
  return licenseTxt === undefined ? PnpmPackageInfo : { ...PnpmPackageInfo, licenseTxt };
}
