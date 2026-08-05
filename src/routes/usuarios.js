const express = require('express');
const router = express.Router();

// Ruta principal para usuarios: GET /usuarios
router.get('/', (req, res) => {
  res.json({ mensaje: "¡Ruta de usuarios funcionando correctamente!" });
});

module.exports = router;