import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: { command: 'pnpm preview', port: 4173, reuseExistingServer: true },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
