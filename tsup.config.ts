import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2020",
  entry: ["src/index.ts", "src/bin/pnpm-license-exporter.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  sourcemap: true,
});