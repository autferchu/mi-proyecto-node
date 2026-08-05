const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

// Definición de rutas
router.get('/', empleadosController.getEmpleados);
router.post('/', empleadosController.createEmpleado);

module.exports = router;