const express = require("express");

const app = express();

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios");
const empleadosRoutes = require("./routes/empleados");

app.use("/usuarios", usuariosRoutes);
app.use("/empleados", empleadosRoutes);

app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});