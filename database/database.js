const sqlite3 = require("sqlite3").verbose();

// 1. Conexión a la base de datos (UNA sola vez)
const db = new sqlite3.Database("./database/miapi.db", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a SQLite");
  }
});

// 2. Crear la tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);
});

// 3. Exportar la instancia de la base de datos (UNA sola vez)
module.exports = db;