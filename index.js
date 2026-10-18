const app = require("./src/app");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");

app.listen(PORT, HOST, () => {
  console.log("===========================================");
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  console.log("===========================================");
  console.log("API lista para recibir peticiones");
});