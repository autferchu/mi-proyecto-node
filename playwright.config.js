const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // O la carpeta donde tengas guardados tus tests
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
  webServer: {
    command: 'npm start', // Asegúrate de que sea el comando con el que inicia tu servidor Node
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});