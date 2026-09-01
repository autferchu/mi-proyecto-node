const express = require("express");
const app = express();

const rutasEmpleados = require("./routes/empleadosRoutes");

// Middleware para leer JSON
app.use(express.json());

// Rutas de empleados
app.use("/api", rutasEmpleados);

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({
    mensaje: "El servidor responde correctamente"
  });
});

module.exports = app;