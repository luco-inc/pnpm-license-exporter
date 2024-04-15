# pnpm-license-exporter

![License](https://img.shields.io/npm/l/@luco-inc/pnpm-license-exporter?style=for-the-badge)
![Version](https://img.shields.io/npm/v/@luco-inc/pnpm-license-exporter?color=blue&label=Version&logo=npm&style=for-the-badge)

Dependencies license exporter for projects using pnpm.

Internally using the `pnpm licenses list` command to get the licenses of the dependencies.


## Requirements

- Node.js 20.0.0 or higher (tested on 20.12.2, experimental support for 18.3.0 or higher)
  - Internally using [`parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig) which is available since Node.js 18.3.0
- pnpm 6.0.0 or higher (tested on 6.14.4)
  - CAN NOT use yarn and npm

## Usage

```bash
pnpm install -D @luco-inc/pnpm-license-exporter

pnpm-license-exporter [options]
```

or 

```bash
pnpm dlx @luco-inc/pnpm-license-exporter [options]
```


## CLI Usage
Export only directly & production dependencies: `pnpm-license-exporter`
Export all production dependencies: `pnpm-license-exporter --recursive` <-- Recommended
Export all dependencies: `pnpm-license-exporter --recursive --dev`

## Options
| Arg             | Description                      | Type           | Default         |
|-----------------|----------------------------------|----------------|-----------------|
| -o, --output    | Output folder for the exports.   | [string]       | ./licenses.json |
| -p, --pretty    | Prettify the json output.        | flag/[boolean] | false           |
| -r, --recursive | Include all subDependencies      | flag/[boolean] | false           |
| -d, --dev       | Include dev dependencies.        | flag/[boolean] | false           |
| --no-prod       | Exclude production dependencies. | flag/[boolean] | false           |
| --no-optional   | Exclude optional dependencies.   | flag/[boolean] | false           |

