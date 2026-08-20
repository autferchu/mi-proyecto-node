const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/mi_base.db", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a SQLite");
  }
});

module.exports = db;