import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';

export async function findLicenseDirent(pnpmPackagePath: string): Promise<Dirent | undefined> {
  const dirents = await readdir(pnpmPackagePath, { withFileTypes: true });
  return dirents.find((dirent) => dirent.name.toLowerCase().includes('license'));
}
