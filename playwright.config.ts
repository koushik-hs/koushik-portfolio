import { defineConfig } from '@playwright/test';

const port = 3167;
const baseURL = `http://127.0.0.1:${port}`;
const executablePath = process.env.CHROMIUM_EXECUTABLE;
const chromiumArgs = process.env.CHROMIUM_ARGS?.split(' ').filter(Boolean);

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    browserName: 'chromium',
    launchOptions: { executablePath, args: chromiumArgs },
  },
  webServer: {
    command: `npm run start -- -H 127.0.0.1 -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
