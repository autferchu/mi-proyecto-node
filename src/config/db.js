const sqlite3 = require("sqlite3").verbose();

// Crear conexión a la base de datos
const db = new sqlite3.Database("./database/miapi.db", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a SQLite");
  }
});

// Exportar la conexión
module.exports = db;