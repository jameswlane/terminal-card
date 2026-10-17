import boxen, { type Options } from 'boxen';
import chalk from 'chalk';
import supportsHyperlinks from 'supports-hyperlinks';

// Define options for Boxen
const options: Options = {
  borderColor: 'green',
  borderStyle: 'round',
  margin: 1,
  padding: 1,
};

// Raw card information
const data = {
  github: 'https://github.com/jameswlane',
  handle: 'jameswlane',
  linkedin: 'https://www.linkedin.com/in/jameswlane/',
  name: 'James W. Lane /',
  npx: 'npx jameswlane',
  web: 'https://jameswlane.com',
  work: 'Agile Coach & Software Engineer',
  x: 'https://x.com/jameswlane',
};

// Labels are padded to the longest one so the values line up
const labels = ['Work:', 'X:', 'GitHub:', 'LinkedIn:', 'Web:', 'Card:'];
const labelWidth = Math.max(...labels.map((label) => label.length));

// OSC 8 makes the URLs clickable in supporting terminals, degrading to colored
// (or, without color support, plain) text elsewhere
const hyperlink = (text: string, url: string): string => {
  if (chalk.level === 0) {
    return text;
  }
  return supportsHyperlinks.stdout
    ? `\u001B]8;;${url}\u0007${chalk.cyan.underline(text)}\u001B]8;;\u0007`
    : chalk.cyan(text);
};

const row = (label: string, value: string): string =>
  `${chalk.green.bold(label.padEnd(labelWidth))}  ${value}`;

// Actual strings we're going to output
const lines = [
  `${chalk.white.bold(data.name)} ${chalk.green.bold(data.handle)}`,
  '',
  row('Work:', chalk.white(data.work)),
  row('X:', hyperlink(data.x, data.x)),
  row('GitHub:', hyperlink(data.github, data.github)),
  row('LinkedIn:', hyperlink(data.linkedin, data.linkedin)),
  row('Web:', hyperlink(data.web, data.web)),
  '',
  row('Card:', chalk.white(data.npx)),
];

// Unboxed card content, handy for scripts: `npx jameswlane --plain | grep github`
export const plain = lines.join('\n');

export default boxen(plain, options);
