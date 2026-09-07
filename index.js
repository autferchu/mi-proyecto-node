const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log("===========================================");
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log("===========================================");
});