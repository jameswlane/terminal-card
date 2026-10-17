import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    env: {
      // Keep the snapshot deterministic regardless of the local terminal
      FORCE_COLOR: '0',
    },
    server: {
      deps: {
        // Inline these so vi.resetModules() re-runs their import-time
        // environment detection (color level, hyperlink support) in tests
        inline: ['chalk', 'supports-hyperlinks'],
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
