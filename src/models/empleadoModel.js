const db = require("../config/db");

const Empleado = {
  obtenerTodos: (callback) => {
    db.all("SELECT * FROM empleados ORDER BY id ASC", [], callback);
  },

  obtenerPorId: (id, callback) => {
    db.get("SELECT * FROM empleados WHERE id = ?", [id], callback);
  },

  obtenerPorEmail: (email, callback) => {
    db.get("SELECT * FROM empleados WHERE LOWER(email) = LOWER(?)", [email], callback);
  },

  crear: (empleado, callback) => {
    const sql = `
      INSERT INTO empleados
      (nombre, apellido, email, puesto, salario)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        empleado.nombre,
        empleado.apellido,
        empleado.email,
        empleado.puesto,
        empleado.salario
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        const empleadoId = result && result.lastID ? result.lastID : null;

        if (empleadoId === null) {
          return db.get(
            "SELECT * FROM empleados WHERE email = ?",
            [empleado.email],
            (selectErr, empleadoCreado) => {
              if (selectErr) {
                return callback(selectErr);
              }

              return callback(null, empleadoCreado || { ...empleado });
            }
          );
        }

        db.get("SELECT * FROM empleados WHERE id = ?", [empleadoId], (selectErr, empleadoCreado) => {
          if (selectErr) {
            return callback(selectErr);
          }

          callback(null, empleadoCreado || { id: empleadoId, ...empleado });
        });
      }
    );
  },

  actualizar: (id, empleado, callback) => {
    const sql = `
      UPDATE empleados
      SET nombre = ?, apellido = ?, email = ?, puesto = ?, salario = ?
      WHERE id = ?
    `;

    db.run(
      sql,
      [
        empleado.nombre,
        empleado.apellido,
        empleado.email,
        empleado.puesto,
        empleado.salario,
        id
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        const cambios = result && typeof result.changes === "number" ? result.changes : 0;
        callback(null, cambios);
      }
    );
  },

  eliminar: (id, callback) => {
    db.run("DELETE FROM empleados WHERE id = ?", [id], (err, result) => {
      if (err) {
        return callback(err);
      }

      const cambios = result && typeof result.changes === "number" ? result.changes : 0;
      callback(null, cambios);
    });
  }
};

module.exports = Empleado;