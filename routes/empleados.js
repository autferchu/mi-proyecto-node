const express = require("express");

const router = express.Router();

const controller = require("../controllers/empleadosController");

router.get("/", controller.obtenerEmpleados);
router.get("/:id", controller.obtenerEmpleado);
router.post("/", controller.crearEmpleado);

module.exports = router;