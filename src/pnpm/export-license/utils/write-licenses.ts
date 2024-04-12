import { writeFile, mkdir } from 'node:fs/promises';

import { generateFlatPnpmPackages } from './generate-flat-pnpm-packages.util';
import { searchLicense } from './search-license.util';
import { argsOptions } from '../../../bin/pnpm-license-exporter';
import path from 'node:path';

type argType = {
  output?: string;
  pretty?: boolean;
  recursive?: boolean;
  dev?: boolean;
  noProd?: boolean;
  noOptional?: boolean;
};

export async function writeLicenses({
  output = argsOptions.output.default,
  pretty = argsOptions.pretty.default,
  recursive = argsOptions.recursive.default,
  dev = argsOptions.dev.default,
  noProd = argsOptions['no-prod'].default,
  noOptional = argsOptions['no-optional'].default,
}: argType) {
  const licenses = await searchLicense(
    generateFlatPnpmPackages({
      recursive,
      dev,
      noProd,
      noOptional,
    })
  );
  const dirName = path.dirname(output);
  if (dirName) {
    await mkdir(dirName, { recursive: true });
  }
  await writeFile(output, JSON.stringify(licenses, undefined, pretty ? 2 : undefined));
}
