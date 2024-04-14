import type { ParseArgsConfig } from 'node:util';

export const argsOptions = {
  output: {
    type: 'string',
    multiple: false,
    short: 'o',
    default: './licenses.json',
  },
  pretty: {
    type: 'boolean',
    multiple: false,
    short: 'p',
    default: false,
  },
  recursive: {
    type: 'boolean',
    multiple: false,
    short: 'r',
    default: false,
  },
  dev: {
    type: 'boolean',
    multiple: false,
    short: 'd',
    default: false,
  },
  'no-prod': {
    type: 'boolean',
    multiple: false,
    default: false,
  },
  'no-optional': {
    type: 'boolean',
    multiple: false,
    default: false,
  },
} satisfies ParseArgsConfig['options'];