const Empleado = require('../models/empleadoModel');

// Controlador para obtener empleados (GET)
exports.getEmpleados = (req, res) => {
  Empleado.obtenerTodos((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
};

// Controlador para crear un empleado (POST)
exports.createEmpleado = (req, res) => {
  const { nombre, puesto } = req.body;
  
  if (!nombre || !puesto) {
    return res.status(400).json({ error: 'Nombre y puesto son obligatorios' });
  }

  Empleado.crear({ nombre, puesto }, (err, empleadoCreado) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ mensaje: 'Empleado creado con éxito', data: empleadoCreado });
  });
};