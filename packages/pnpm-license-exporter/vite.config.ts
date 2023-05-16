import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PnPmLicenseExporter',
      fileName: 'pnpm-license-exporter',
    },
    rollupOptions: {
      external: ['node:fs/promises', 'node:child_process', 'node:fs'],
    },
  },
});
