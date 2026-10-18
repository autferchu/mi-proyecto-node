# API de Gestión de Empleados

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js 22" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express" alt="Express 5" />
  <img src="https://img.shields.io/badge/SQLite-Ready-003B57?style=for-the-badge&logo=sqlite" alt="SQLite" />
  <img src="https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Render-Deploy-46E3B7?style=for-the-badge&logo=render" alt="Render" />
</p>

API REST para gestionar empleados con Node.js y Express. Incluye validaciones, manejo de errores y soporte para SQLite en desarrollo y PostgreSQL en producción.

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución local](#ejecución-local)
- [Endpoints](#endpoints)
- [Deploy en Render](#deploy-en-render)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)

## Descripción

Esta API permite:

- Crear empleados
- Obtener todos los empleados
- Obtener un empleado por ID
- Actualizar registros existentes
- Eliminar empleados
- Validar campos obligatorios
- Gestionar errores de forma consistente
- Ejecutarse en local y en un entorno en la nube

## Tecnologías

- Node.js 22
- Express 5
- SQLite (local/desarrollo)
- PostgreSQL (producción)
- CORS
- Render

## Requisitos

- Node.js 22.x
- npm
- Git

## Instalación

1. Cloná el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

2. Instalá las dependencias:

```bash
npm install
```

## Variables de entorno

Creá un archivo `.env` con la siguiente estructura:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://usuario:password@host:5432/mi_api_empleados
```

Si `DATABASE_URL` no está definida, la aplicación usa SQLite por defecto. Esto es útil para entorno local o pruebas rápidas.

También podés usar el archivo base:

```bash
.env.example
```

## Ejecución local

```bash
node index.js
```

La API quedará disponible en:

```bash
http://localhost:3000
```

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/health` | Verifica que la API esté funcionando |
| GET | `/api/test` | Endpoint de prueba |
| GET | `/api/empleados` | Obtiene todos los empleados |
| GET | `/api/empleados/:id` | Obtiene un empleado por ID |
| POST | `/api/empleados` | Crea un empleado |
| PUT | `/api/empleados/:id` | Actualiza un empleado |
| DELETE | `/api/empleados/:id` | Elimina un empleado |

### Ejemplo: crear un empleado

```http
POST /api/empleados
Content-Type: application/json
```

```json
{
  "nombre": "Ana",
  "apellido": "Gomez",
  "email": "ana@test.com",
  "puesto": "QA",
  "salario": 3500000
}
```

### Respuesta exitosa

```json
{
  "mensaje": "Empleado creado con éxito",
  "data": {
    "id": 1,
    "nombre": "Ana",
    "apellido": "Gomez",
    "email": "ana@test.com",
    "puesto": "QA",
    "salario": 3500000
  }
}
```

### Error de validación

```json
{
  "error": "El email no es válido"
}
```

## Deploy en Render

1. Subí este repositorio a GitHub.
2. Entrá a Render.
3. Hacé click en `New +` → `Web Service`.
4. Conectá tu repositorio.
5. Configurá:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Dejá que Render complete el deploy.

El proyecto incluye la configuración necesaria en:

```bash
render.yaml
```

Esto permite que Render cree el servicio web y la base de datos PostgreSQL asociada.

## Estructura del proyecto

```text
.
├── index.js
├── package.json
├── package-lock.json
├── render.yaml
├── README.md
├── .env.example
├── .gitignore
├── database/
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
├── tests/
└── test-results/
```

## Nota de producción

Para un entorno de producción real, se recomienda usar PostgreSQL en lugar de SQLite. La API está preparada para detectar `DATABASE_URL` y utilizar PostgreSQL automáticamente cuando esté disponible.

## Licencia

ISC

## Autor

Fernando
