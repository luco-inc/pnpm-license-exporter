export type PnpmPackageInfo = {
  name: string;
  version: string;
  license: string;
  author: string;
  description: string;
  homepage: string;
  path: string;
};

export type PnpmLicenses = {
  [license: string]: PnpmPackageInfo[];
};

export type PnpmPackageWithLicenseTxt = {
  licenseTxt: string;
} & PnpmPackageInfo;

export type LicensePackageInfo = Omit<PnpmPackageInfo, 'path'>;

export type LicensePackageKey = keyof LicensePackageInfo;

export const ForceLicenseLoadPackageNames = [
  'toggle-selection',
  '@swc/helpers',
  '@next/env',
  'client-only',
  '@rollup/pluginutils',
  'lru_map',
  'tr46',
  'type-fest',
] as const;

export type ForceLicenseLoadPackageName = (typeof ForceLicenseLoadPackageNames)[number];
