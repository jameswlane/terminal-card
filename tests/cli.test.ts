import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { beforeAll, expect, test } from 'vitest';

const execFileAsync = promisify(execFile);

const root = fileURLToPath(new URL('..', import.meta.url));
const cli = fileURLToPath(new URL('../bin/cli.js', import.meta.url));

const run = (args: string[] = []) => execFileAsync(process.execPath, [cli, ...args]);

beforeAll(async () => {
  // bin/cli.js runs the compiled lib/, so make sure the build is fresh
  const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  await execFileAsync(pnpm, ['run', 'build'], { cwd: root });
}, 120_000);

test('prints the boxed card by default', async () => {
  const { stdout } = await run();
  expect(stdout).toContain('╭');
  expect(stdout).toContain('James W. Lane');
});

test('--plain prints the card without the border', async () => {
  const { stdout } = await run(['--plain']);
  expect(stdout).not.toContain('╭');
  expect(stdout).toContain('https://github.com/jameswlane');
});

test('--version prints the package version', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const { stdout } = await run(['--version']);
  expect(stdout.trim()).toBe(pkg.version);
});

test('--help prints usage', async () => {
  const { stdout } = await run(['--help']);
  expect(stdout).toContain('Usage: npx jameswlane');
});

test('unknown flags fail with usage on stderr', async () => {
  await expect(run(['--bogus'])).rejects.toMatchObject({
    code: 1,
    stderr: expect.stringContaining('Unknown flag: --bogus'),
  });
});

test('extra arguments fail', async () => {
  await expect(run(['--plain', 'extra'])).rejects.toMatchObject({
    code: 1,
    stderr: expect.stringContaining('Unexpected extra arguments: extra'),
  });
});
