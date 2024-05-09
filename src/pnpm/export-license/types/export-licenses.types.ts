export type PnpmPackageInfo = {
  name: string;
  version: string;
  license: string;
  author: string;
  description: string;
  homepage: string;
  path?: string;
  paths?: string[];
};

export type PnpmLicenses = {
  [license: string]: PnpmPackageInfo[];
};

export type ExportedPnpmPackageInfo = {
  licenseTxt?: string;
  // path property is only not exported
} & Omit<PnpmPackageInfo, 'path' | 'paths'>;

export type LicensePackageInfo = Omit<PnpmPackageInfo, 'path' | 'paths'>;

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
