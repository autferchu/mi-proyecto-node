const Empleado = require("../models/empleadoModel");

// Obtener todos los empleados
exports.getEmpleados = (req, res) => {
  Empleado.obtenerTodos((err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json({
      data: rows
    });
  });
};

// Crear un empleado
exports.createEmpleado = (req, res) => {

  const {
    nombre,
    apellido,
    email,
    puesto,
    salario
  } = req.body;

  if (!nombre || !apellido || !email || !puesto || salario == null) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  Empleado.crear(
    {
      nombre,
      apellido,
      email,
      puesto,
      salario
    },
    (err, empleadoCreado) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.status(201).json({
        mensaje: "Empleado creado con éxito",
        data: empleadoCreado
      });

    }
  );

};
// Obtener un empleado por ID
exports.getEmpleadoById = (req, res) => {

  const id = req.params.id;

  Empleado.obtenerPorId(id, (err, empleado) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (!empleado) {
      return res.status(404).json({
        error: "Empleado no encontrado"
      });
    }

    res.json({
      data: empleado
    });

  });

};
// Busca esta línea en exports.createEmpleado:
mensaje: "Empleado creado con Ã©xito"

// Y reemplázala por:
//mensaje: "Empleado creado con éxito"