#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

import card, { plain } from '../lib/index.js';
import pkg from '../package.json' with { type: 'json' };

const usage = `Usage: npx jameswlane [flag]

James W. Lane's business card — https://jameswlane.com

  (no flag)    Print the card
  --plain      Print the card without the border (useful in scripts)
  --version    Print the package version
  --help       Show this message`;

const [flag, ...rest] = process.argv.slice(2);

if (rest.length > 0) {
  console.error(`Unexpected extra arguments: ${rest.join(' ')}\n\n${usage}`);
  process.exit(1);
}

switch (flag) {
  case undefined:
    console.log(card);
    break;
  case '--plain':
    console.log(plain);
    break;
  case '--version':
  case '-v':
    console.log(pkg.version);
    break;
  case '--help':
  case '-h':
    console.log(usage);
    break;
  default:
    console.error(`Unknown flag: ${flag}\n\n${usage}`);
    process.exit(1);
}
