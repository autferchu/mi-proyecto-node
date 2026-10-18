
const sqlite3 = require("sqlite3").verbose();
const { Pool } = require("pg");
const path = require("path");

<<<<<<< HEAD
const createSqliteDb = () => {
  const dbPath = path.resolve(__dirname, "../../database/miapi.db");

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error al conectar con SQLite:", err.message);
    } else {
      console.log("Conectado a SQLite");
    }
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS empleados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        puesto TEXT NOT NULL,
        salario REAL NOT NULL
      )
    `);
  });

  return {
    all: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }
      db.all(sql, params, callback);
    },
    get: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }
      db.get(sql, params, callback);
    },
    run: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }
      db.run(sql, params, function (err) {
        if (err) {
          return callback(err);
        }

        callback(null, {
          changes: this.changes,
          lastID: this.lastID
        });
      });
    },
    close: (callback) => db.close(callback)
  };
};

const createPostgresDb = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });

  pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error", err);
  });

  pool.query(`
    CREATE TABLE IF NOT EXISTS empleados (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      puesto TEXT NOT NULL,
      salario NUMERIC NOT NULL CHECK (salario > 0)
    )
  `)
    .then(() => console.log("Conectado a PostgreSQL"))
    .catch((err) => console.error("Error al crear la tabla en PostgreSQL:", err.message));

  return {
    all: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }

      pool
        .query(sql, params)
        .then((result) => callback(null, result.rows))
        .catch((err) => callback(err));
    },
    get: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }

      pool
        .query(sql, params)
        .then((result) => callback(null, result.rows[0] || null))
        .catch((err) => callback(err));
    },
    run: (sql, params, callback) => {
      if (typeof params === "function") {
        callback = params;
        params = [];
      }

      pool
        .query(sql, params)
        .then((result) => {
          const lastRowId = result.rows?.[0]?.id ?? null;
          callback(null, {
            changes: result.rowCount || 0,
            lastID: lastRowId
          });
        })
        .catch((err) => callback(err));
    },
    close: (callback) => {
      pool.end().then(() => callback && callback()).catch((err) => callback && callback(err));
    }
  };
};

const db = process.env.DATABASE_URL ? createPostgresDb() : createSqliteDb();
=======
const db = new sqlite3.Database(
  "./src/database/mi_base.db",
  (err) => {
    if (err) {
      console.error("Error al conectar con SQLite:", err.message);
      return;
    }

    console.log("Conectado a SQLite");
  }
);

// Crear la tabla si todavía no existe
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS empleados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      puesto TEXT NOT NULL,
      salario REAL NOT NULL CHECK (salario > 0)
    )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla:", err.message);
      } else {
        console.log("Tabla empleados verificada correctamente");
      }
    }
  );
});
>>>>>>> a4710ac (Corregir configuracion del servidor y Playwright para CI)

module.exports = db;
