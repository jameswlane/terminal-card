import { afterEach, expect, test, vi } from 'vitest';

import card, { plain } from '../src/index.js';

afterEach(() => {
  vi.unstubAllEnvs();
});

test('Output should match snapshot', () => {
  expect(card).toMatchSnapshot();
});

test('Card includes current details', () => {
  expect(card).toContain('James W. Lane');
  expect(card).toContain('Agile Coach & Software Engineer');
  expect(card).toContain('https://github.com/jameswlane');
  expect(card).toContain('https://x.com/jameswlane');
  expect(card).toContain('https://www.linkedin.com/in/jameswlane/');
  expect(card).toContain('https://jameswlane.com');
  expect(card).toContain('npx jameswlane');
});

test('Plain output drops the box but keeps the links', () => {
  expect(plain).not.toContain('─');
  expect(plain).toContain('https://github.com/jameswlane');
  expect(plain).toContain('npx jameswlane');
});

test('Links are plain text when color is unsupported', () => {
  // FORCE_COLOR=0 is pinned in vitest.config.ts, so this module instance
  // was imported with chalk.level === 0
  expect(card).not.toContain('\u001B]8;;');
  expect(card).not.toContain('\u001B[');
});

test('Links become OSC 8 hyperlinks when color and hyperlinks are supported', async () => {
  vi.stubEnv('FORCE_COLOR', '1');
  vi.stubEnv('FORCE_HYPERLINK', '1');
  vi.resetModules();

  const { default: coloredCard } = await import('../src/index.js');

  expect(coloredCard).toContain('\u001B]8;;https://github.com/jameswlane\u0007');
});

test('Links fall back to colored text when hyperlinks are unsupported', async () => {
  vi.stubEnv('FORCE_COLOR', '1');
  vi.stubEnv('FORCE_HYPERLINK', '0');
  vi.resetModules();

  const { default: coloredCard } = await import('../src/index.js');

  expect(coloredCard).not.toContain(']8;;');
  expect(coloredCard).toContain('\u001B['); // still colorized
});
