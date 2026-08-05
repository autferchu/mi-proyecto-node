const express = require('express');
const router = express.Router();

// Ruta GET para obtener empleados
router.get('/', (req, res) => {
  res.json({ mensaje: "Ruta de empleados funcionando correctamente" });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

router.get('/', empleadosController.getEmpleados);
router.post('/', empleadosController.createEmpleado);

module.exports = router;