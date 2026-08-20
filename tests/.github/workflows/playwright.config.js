import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  // Esto arranca tu servidor automáticamente antes de correr los tests
  webServer: {
    command: 'node index.js',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});