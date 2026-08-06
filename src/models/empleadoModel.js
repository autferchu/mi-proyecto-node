const db = require("../config/db");

const Empleado = {

  // Obtener todos los empleados
  obtenerTodos: (callback) => {
    const sql = "SELECT * FROM empleados";
    db.all(sql, [], callback);
  },

  // Obtener un empleado por ID
  obtenerPorId: (id, callback) => {
    const sql = "SELECT * FROM empleados WHERE id = ?";
    db.get(sql, [id], callback);
  },

  // Crear un empleado
  crear: (nuevoEmpleado, callback) => {

    const sql = `
      INSERT INTO empleados
      (nombre, apellido, email, puesto, salario)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        nuevoEmpleado.nombre,
        nuevoEmpleado.apellido,
        nuevoEmpleado.email,
        nuevoEmpleado.puesto,
        nuevoEmpleado.salario
      ],
      function (err) {

        if (err) {
          return callback(err);
        }

        callback(null, {
          id: this.lastID,
          ...nuevoEmpleado
        });

      }
    );
  }

};

module.exports = Empleado;
obtenerPorId: (id, callback) => {
  const sql = "SELECT * FROM empleados WHERE id = ?";
  db.get(sql, [id], callback);
}