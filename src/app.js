const express = require("express");
const cors = require("cors");
const app = express();

const rutasEmpleados = require("./routes/empleadosRoutes");

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API funcionando correctamente",
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/api", rutasEmpleados);

app.get("/api/test", (req, res) => {
  res.json({
    mensaje: "El servidor responde correctamente"
  });
});

module.exports = app;