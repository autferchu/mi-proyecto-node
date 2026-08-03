const express = require("express");

const router = express.Router();

const controller = require("../controllers/usuariosController");

router.get("/", controller.obtenerUsuarios);
router.get("/:id", controller.obtenerUsuario);
router.post("/", controller.crearUsuario);
router.put("/:id", controller.actualizarUsuario);

router.delete("/:id", controller.eliminarUsuario);
module.exports = router;
