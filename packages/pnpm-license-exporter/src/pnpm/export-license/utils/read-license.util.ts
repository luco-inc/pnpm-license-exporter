import { readFile } from 'node:fs/promises';
import type { ForceLicenseLoadPackageName } from '../types/export-licenses.types';
import { forceLoadedLicenseMap } from '../const/force-loaded-license-map';

type SearchLicenseArgs = {
  licensePath: string;
  name: ForceLicenseLoadPackageName | string;
};

const searchForceLoadLicense = (name: string) =>
  new Promise<string | undefined>((resolve) => {
    resolve(forceLoadedLicenseMap.get(name));
  });

export async function readLicense({ name, licensePath }: SearchLicenseArgs): Promise<string | undefined> {
  try {
    const forceLoadedLicense = await searchForceLoadLicense(name);
    if (typeof forceLoadedLicense === 'string') {
      return forceLoadedLicense;
    }
    return await readFile(licensePath, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
