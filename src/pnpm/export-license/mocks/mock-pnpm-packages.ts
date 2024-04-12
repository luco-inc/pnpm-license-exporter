import { PnpmLicenses } from '../types/export-licenses.types';

export const mockPnpmPackages: PnpmLicenses = {
  'Apache-2.0': [
    {
      name: '@ampproject/remapping',
      version: '2.2.0',
      path: '/Users/luco/ghq/sucomado-frontend/node_modules/.pnpm/@ampproject+remapping@2.2.0/node_modules/@ampproject/remapping',
      license: 'Apache-2.0',
      author: 'Justin Ridgewell',
      homepage: 'https://github.com/ampproject/remapping#readme',
      description: 'Remap sequential sourcemaps through transformations to point at the original source code',
    },
  ],
  MIT: [
    {
      name: '@aspida/fetch',
      version: '1.11.0',
      path: '/Users/luco/ghq/github.com/luco-inc/sucomado-frontend/node_modules/.pnpm/@aspida+fetch@1.11.0/node_modules/@aspida/fetch',
      license: 'MIT',
      author: 'Solufa',
      homepage: 'https://github.com/aspida/aspida/tree/master/packages/aspida-fetch#readme',
      description: 'fetch client for aspida',
    },
    {
      name: '@babel/code-frame',
      version: '7.18.6',
      path: '/Users/luco/ghq/github.com/luco-inc/sucomado-frontend/node_modules/.pnpm/@babel+code-frame@7.18.6/node_modules/@babel/code-frame',
      license: 'MIT',
      author: 'The Babel Team',
      homepage: 'https://babel.dev/docs/en/next/babel-code-frame',
      description: 'Generate errors that contain a code frame that point to source locations.',
    },
  ],
};

export const mockPnpmFlatPackages = [...mockPnpmPackages['Apache-2.0'], ...mockPnpmPackages.MIT];
