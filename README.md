# James W. Lane

[![npm version](https://img.shields.io/npm/v/jameswlane.svg)](https://www.npmjs.com/package/jameswlane)
[![CI](https://github.com/jameswlane/terminal-card/actions/workflows/ci.yml/badge.svg)](https://github.com/jameswlane/terminal-card/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/jameswlane/terminal-card/graph/badge.svg)](https://codecov.io/gh/jameswlane/terminal-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Code for my personal npm card: `npx jameswlane`

```bash
npx jameswlane
```

![business card](/preview.png)

## Flags

- `--plain` — print the card without the border (useful for scripts, e.g. `npx jameswlane --plain | grep github`)
- `--version` — print the package version
- `--help` — show usage

## Development

```bash
pnpm install
pnpm build    # compile TypeScript to lib/
pnpm test     # run the vitest suite
pnpm lint     # biome check
```

---

The idea for this card was from [bitandbang](https://x.com/bitandbang) who's source you can see [here](https://github.com/bnb/bitandbang).
