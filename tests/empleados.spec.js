import { test, expect } from '@playwright/test';

test('Crear un empleado correctamente', async ({ request }) => {

  const response = await request.post('/api/empleados', {
    data: {
      nombre: 'Fernando',
      apellido: 'Rodriguez',
      email: 'fernando@test.com',
      puesto: 'QA Analyst',
      salario: 3200000
    }
  });

  console.log('Status:', response.status());

  const body = await response.json();

  console.log('Respuesta:', body);

  expect(response.status()).toBe(201);

  expect(body.data.nombre).toBe('Fernando');
  expect(body.data.apellido).toBe('Rodriguez');
  expect(body.data.email).toBe('fernando@test.com');
});
import { test, expect } from '@playwright/test';

// ----------------------------
// Helper para generar datos únicos
// ----------------------------
function crearEmpleadoValido(overrides = {}) {
  return {
    nombre: 'Fernando',
    apellido: 'Rodriguez',
    email: `fernando_${Date.now()}_${Math.random().toString(36).slice(2)}@test.com`,
    puesto: 'QA Analyst',
    salario: 3200000,
    ...overrides
  };
}

test.describe('CRUD Empleados', () => {

  test('Crear un empleado correctamente', async ({ request }) => {
    const empleado = crearEmpleadoValido();

    const response = await request.post('/api/empleados', { data: empleado });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.data.nombre).toBe(empleado.nombre);
    expect(body.data.apellido).toBe(empleado.apellido);
    expect(body.data.email).toBe(empleado.email);
    expect(body.data.puesto).toBe(empleado.puesto);
    expect(body.data.salario).toBe(empleado.salario);
    expect(body.data).toHaveProperty('id');
  });

  test('Obtener un empleado por ID', async ({ request }) => {
    const empleado = crearEmpleadoValido();
    const createResponse = await request.post('/api/empleados', { data: empleado });
    const created = await createResponse.json();

    const getResponse = await request.get(`/api/empleados/${created.data.id}`);
    expect(getResponse.status()).toBe(200);

    const body = await getResponse.json();
    expect(body.data.email).toBe(empleado.email);
  });

  test('Actualizar un empleado existente', async ({ request }) => {
    const empleado = crearEmpleadoValido();
    const createResponse = await request.post('/api/empleados', { data: empleado });
    const created = await createResponse.json();

    const updateResponse = await request.put(`/api/empleados/${created.data.id}`, {
      data: { puesto: 'QA Lead', salario: 3800000 }
    });

    expect(updateResponse.status()).toBe(200);

    const body = await updateResponse.json();
    expect(body.data.puesto).toBe('QA Lead');
    expect(body.data.salario).toBe(3800000);
  });

  test('Eliminar un empleado existente', async ({ request }) => {
    const empleado = crearEmpleadoValido();
    const createResponse = await request.post('/api/empleados', { data: empleado });
    const created = await createResponse.json();

    const deleteResponse = await request.delete(`/api/empleados/${created.data.id}`);
    expect(deleteResponse.status()).toBe(200); // o 204, según cómo responda tu API

    // Verificar que ya no existe
    const getResponse = await request.get(`/api/empleados/${created.data.id}`);
    expect(getResponse.status()).toBe(404);
  });

});

test.describe('Casos negativos - Crear empleado', () => {

  test('Falla si faltan campos obligatorios', async ({ request }) => {
    const response = await request.post('/api/empleados', {
      data: { nombre: 'Fernando' } // faltan apellido, email, etc.
    });

    expect(response.status()).toBe(400);
  });

  test('Falla con email inválido', async ({ request }) => {
    const empleado = crearEmpleadoValido({ email: 'esto-no-es-un-email' });

    const response = await request.post('/api/empleados', { data: empleado });

    expect(response.status()).toBe(400);
  });

  test('Falla con email duplicado', async ({ request }) => {
    const empleado = crearEmpleadoValido();

    // Primera creación: debe ser exitosa
    const first = await request.post('/api/empleados', { data: empleado });
    expect(first.status()).toBe(201);

    // Segunda creación con el mismo email: debe fallar
    const second = await request.post('/api/empleados', { data: empleado });
    expect(second.status()).toBe(409); // o 400, según implementación de tu API
  });

  test('Falla con salario negativo', async ({ request }) => {
    const empleado = crearEmpleadoValido({ salario: -1000 });

    const response = await request.post('/api/empleados', { data: empleado });

    expect(response.status()).toBe(400);
  });

  test('Falla con salario no numérico', async ({ request }) => {
    const empleado = crearEmpleadoValido({ salario: 'mucho dinero' });

    const response = await request.post('/api/empleados', { data: empleado });

    expect(response.status()).toBe(400);
  });

});

test.describe('Casos negativos - Obtener/Actualizar/Eliminar', () => {

  test('GET con ID inexistente devuelve 404', async ({ request }) => {
    const response = await request.get('/api/empleados/999999999');
    expect(response.status()).toBe(404);
  });

  test('PUT con ID inexistente devuelve 404', async ({ request }) => {
    const response = await request.put('/api/empleados/999999999', {
      data: { puesto: 'QA Lead' }
    });
    expect(response.status()).toBe(404);
  });

  test('DELETE con ID inexistente devuelve 404', async ({ request }) => {
    const response = await request.delete('/api/empleados/999999999');
    expect(response.status()).toBe(404);
  });

});
