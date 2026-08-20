const db = require("../config/db");

const Empleado = {

  obtenerTodos: (callback) => {
    db.all("SELECT * FROM empleados", [], callback);
  },

  obtenerPorId: (id, callback) => {
    db.get(
      "SELECT * FROM empleados WHERE id = ?",
      [id],
      callback
    );
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
      function (err) {

        if (err) {
          return callback(err);
        }

        callback(null, {
          id: this.lastID,
          ...empleado
        });

      }
    );

  },

  actualizar: (id, empleado, callback) => {

    const sql = `
      UPDATE empleados
      SET nombre=?, apellido=?, email=?, puesto=?, salario=?
      WHERE id=?
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
      function (err) {

        if (err) {
          return callback(err);
        }

        callback(null, this.changes);

      }
    );

  },

  eliminar: (id, callback) => {

    db.run(
      "DELETE FROM empleados WHERE id=?",
      [id],
      function (err) {

        if (err) {
          return callback(err);
        }

        callback(null, this.changes);

      }
    );

  }

};

module.exports = Empleado;