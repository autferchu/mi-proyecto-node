import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Apunta explícitamente a la IP 127.0.0.1
    baseURL: 'http://127.0.0.1:3000', 
  },
  
  webServer: {
    command: 'npm run start', // o 'npm run dev' según tu proyecto
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});