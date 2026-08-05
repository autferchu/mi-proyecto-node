const express = require('express');
const app = express();

const empleadosRoutes = require('./routes/empleadosRoutes');

app.use(express.json());
app.use('/api/empleados', empleadosRoutes);

// ⚠️ ¡Esta línea es la que te falta al final!
module.exports = app;