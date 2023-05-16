import type { ForceLicenseLoadPackageName } from '../types/export-licenses.types';
import {
  LruMapLicense,
  clientOnlyLicense,
  nextLicense,
  rollupPluginLicense,
  swcHelperLicense,
  toggleSectionLicense,
  tr46License,
  typeFestLicense,
} from '../../../license-txt';

export const forceLoadedLicenseMap = new Map<ForceLicenseLoadPackageName | string, string>([
  ['toggle-selection', toggleSectionLicense],
  ['@swc/helpers', swcHelperLicense],
  ['@next/env', nextLicense],
  ['client-only', clientOnlyLicense],
  ['@rollup/pluginutils', rollupPluginLicense],
  ['lru_map', LruMapLicense],
  ['tr46', tr46License],
  ['type-fest', typeFestLicense],
]);
