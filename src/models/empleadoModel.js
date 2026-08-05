const db = require('../config/db');

const Empleado = {
  // ⚠️ Esta función es la que te falta o no se está exportando correctamente
  obtenerTodos: (callback) => {
    const sql = 'SELECT * FROM empleados';
    db.all(sql, [], callback);
  },

  crear: (nuevoEmpleado, callback) => {
    const sql = 'INSERT INTO empleados (nombre, puesto) VALUES (?, ?)';
    db.run(sql, [nuevoEmpleado.nombre, nuevoEmpleado.puesto], function (err) {
      callback(err, { id: this ? this.lastID : null, ...nuevoEmpleado });
    });
  }
};

// ⚠️ ¡ASEGÚRATE DE INCLUIR ESTA LÍNEA AL FINAL!
module.exports = Empleado;
