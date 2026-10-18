const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Tiempo máximo por prueba
  timeout: 30_000,

  // Tiempo máximo para expect()
  expect: {
    timeout: 5_000,
  },

  // Ejecuta pruebas en paralelo cuando sea posible
  fullyParallel: true,

  // Reintentos más útiles en CI
  retries: process.env.CI ? 2 : 0,

  // Limita el número de workers en CI para evitar sobrecarga
  workers: process.env.CI ? 2 : undefined,

  // Reportes más útiles
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true,

    // Para depurar fallos
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Tiempos de espera por acción y navegación
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  // Arranca el servidor antes de ejecutar los tests
  webServer: {
    // Forzar HOST 127.0.0.1 para evitar conflictos IPv6/DNS en GitHub Actions
    command: 'HOST=127.0.0.1 npm start',
    url: 'http://127.0.0.1:3000/health',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000, // Margen amplio para que CI levante dependencias y SQLite sin prisa
    stdout: 'pipe',
    stderr: 'pipe',
  },
});