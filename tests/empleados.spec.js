import { test, expect } from '@playwright/test';

test('GET - Obtener todos los empleados', async ({ request }) => {
  // Probamos la ruta directa a /empleados
  const response = await request.get('http://localhost:3000/empleados');

  console.log('--- DEPURACIÓN DE LA PETICIÓN ---');
  console.log('URL llamada:', response.url());
  console.log('Status recibido:', response.status());

  // Verificamos respuesta exitosa
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Respuesta de la API:', body);
});