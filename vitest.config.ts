import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // environment: 'happy-dom',
    // ui: true,
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
  },
});
