#! /usr/bin/env node

import { execSync } from 'node:child_process';
import { parseArgs, ParseArgsConfig } from 'node:util';
import { writeLicenses } from '../pnpm/export-license';
import { argsOptions } from './args-options';

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
  const parsedArgs = parseArgs({ options: argsOptions });
  writeLicenses({
    output: parsedArgs.values.output,
    pretty: parsedArgs.values.pretty,
    recursive: parsedArgs.values.recursive,
    dev: parsedArgs.values.dev,
    noProd: parsedArgs.values['no-prod'],
    noOptional: parsedArgs.values['no-optional'],
  });
}
