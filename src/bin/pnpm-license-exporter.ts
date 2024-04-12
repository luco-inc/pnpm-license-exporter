#! /usr/bin/env node

import { execSync } from 'node:child_process';
import { writeLicenses } from '../pnpm/export-license';

const nodeLinkerSetting = (
  JSON.parse(execSync('pnpm config list --json').toString('utf8')) as {
    'node-linker': string | undefined;
  }
)['node-linker'];

if (nodeLinkerSetting === 'hoisted') {
  console.warn(
    '\u001B[33mWARN\u001B[0m: Skipping license export because node-linker is set to hoisted'
  );
} else {
  writeLicenses('./licenses.json');
}
