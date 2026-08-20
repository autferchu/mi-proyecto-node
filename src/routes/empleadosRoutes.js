const express = require("express");
const router = express.Router();

const empleadosController = require("../controllers/empleadosController");

// Obtener todos los empleados
router.get("/empleados", empleadosController.getEmpleados);

// Obtener un empleado por ID
router.get("/empleados/:id", empleadosController.getEmpleadoById);

// Crear un empleado
router.post("/empleados", empleadosController.createEmpleado);

// Actualizar un empleado
router.put("/empleados/:id", empleadosController.updateEmpleado);

// Eliminar un empleado
router.delete("/empleados/:id", empleadosController.deleteEmpleado);

module.exports = router;