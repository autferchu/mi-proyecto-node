import { test, expect } from '@playwright/test';

test('GET - Obtener todos los empleados', async ({ request }) => {
  // Usamos la ruta relativa y aseguramos fallback a 127.0.0.1 si no hay baseURL
  const response = await request.get('/empleados');

  console.log('--- DEPURACIÓN DE LA PETICIÓN ---');
  console.log('URL llamada:', response.url());
  console.log('Status recibido:', response.status());

  // Verificamos respuesta exitosa
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Respuesta de la API:', body);
});