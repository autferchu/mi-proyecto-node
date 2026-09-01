import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // 1. Cambia localhost por 127.0.0.1
    baseURL: 'http://127.0.0.1:3000', 
  },
  webServer: {
    command: 'npm run start', // El comando con el que levantas tu aplicación
    url: 'http://127.0.0.1:3000', // 2. Aquí también usa 127.0.0.1
    reuseExistingServer: !process.env.CI,
  },
});