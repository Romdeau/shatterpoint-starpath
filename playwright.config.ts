import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:4173/shatterpoint-starpath/', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { ...devices['Pixel 7'] } }],
  webServer: { command: 'bun run preview --host localhost --port 4173 --strictPort', url: 'http://localhost:4173/shatterpoint-starpath/', reuseExistingServer: !process.env.CI },
});
