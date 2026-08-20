const Empleado = require("../models/empleadoModel");

// ==========================================
// GET - Obtener todos los empleados
// ==========================================
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

// ==========================================
// GET - Obtener empleado por ID
// ==========================================
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

// ==========================================
// POST - Crear empleado
// ==========================================
exports.createEmpleado = (req, res) => {
  const {
    nombre,
    apellido,
    email,
    puesto,
    salario
  } = req.body;

  // ------------------------------------------
  // Validar campos obligatorios
  // ------------------------------------------
  if (
    nombre == null ||
    apellido == null ||
    email == null ||
    puesto == null ||
    salario == null
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  // ------------------------------------------
  // Limpiar espacios
  // ------------------------------------------
  const nombreLimpio = String(nombre).trim();
  const apellidoLimpio = String(apellido).trim();
  const emailLimpio = String(email).trim();
  const puestoLimpio = String(puesto).trim();

  // ------------------------------------------
  // Validar nombre
  // ------------------------------------------
  if (nombreLimpio.length < 2) {
    return res.status(400).json({
      error: "El nombre debe tener al menos 2 caracteres"
    });
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreLimpio)) {
    return res.status(400).json({
      error: "El nombre solo puede contener letras"
    });
  }

  // ------------------------------------------
  // Validar apellido
  // ------------------------------------------
  if (apellidoLimpio.length < 2) {
    return res.status(400).json({
      error: "El apellido debe tener al menos 2 caracteres"
    });
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoLimpio)) {
    return res.status(400).json({
      error: "El apellido solo puede contener letras"
    });
  }

  // ------------------------------------------
  // Validar email
  // ------------------------------------------
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
    return res.status(400).json({
      error: "El email no es válido"
    });
  }

  // ------------------------------------------
  // Validar puesto
  // ------------------------------------------
  if (puestoLimpio.length < 2) {
    return res.status(400).json({
      error: "El puesto debe tener al menos 2 caracteres"
    });
  }

  // ------------------------------------------
  // Validar salario
  // ------------------------------------------
  if (typeof salario !== "number" || salario <= 0) {
    return res.status(400).json({
      error: "El salario debe ser un número mayor que 0"
    });
  }

  // ------------------------------------------
  // Crear empleado
  // ------------------------------------------
  Empleado.crear(
    {
      nombre: nombreLimpio,
      apellido: apellidoLimpio,
      email: emailLimpio,
      puesto: puestoLimpio,
      salario: salario
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

// ==========================================
// PUT - Actualizar empleado
// ==========================================
exports.updateEmpleado = (req, res) => {
  const id = req.params.id;

  const {
    nombre,
    apellido,
    email,
    puesto,
    salario
  } = req.body;

  // Validar campos obligatorios
  if (
    nombre == null ||
    apellido == null ||
    email == null ||
    puesto == null ||
    salario == null
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  const nombreLimpio = String(nombre).trim();
  const apellidoLimpio = String(apellido).trim();
  const emailLimpio = String(email).trim();
  const puestoLimpio = String(puesto).trim();

  // Validar nombre
  if (nombreLimpio.length < 2) {
    return res.status(400).json({
      error: "El nombre debe tener al menos 2 caracteres"
    });
  }

  // Validar apellido
  if (apellidoLimpio.length < 2) {
    return res.status(400).json({
      error: "El apellido debe tener al menos 2 caracteres"
    });
  }

  // Validar email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
    return res.status(400).json({
      error: "El email no es válido"
    });
  }

  // Validar salario
  if (typeof salario !== "number" || salario <= 0) {
    return res.status(400).json({
      error: "El salario debe ser un número mayor que 0"
    });
  }

  Empleado.actualizar(
    id,
    {
      nombre: nombreLimpio,
      apellido: apellidoLimpio,
      email: emailLimpio,
      puesto: puestoLimpio,
      salario: salario
    },
    (err, cambios) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (cambios === 0) {
        return res.status(404).json({
          error: "Empleado no encontrado"
        });
      }

      res.json({
        mensaje: "Empleado actualizado correctamente"
      });
    }
  );
};

// ==========================================
// DELETE - Eliminar empleado
// ==========================================
exports.deleteEmpleado = (req, res) => {
  const id = req.params.id;

  Empleado.eliminar(id, (err, cambios) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (cambios === 0) {
      return res.status(404).json({
        error: "Empleado no encontrado"
      });
    }

    res.json({
      mensaje: "Empleado eliminado correctamente"
    });
  });
};