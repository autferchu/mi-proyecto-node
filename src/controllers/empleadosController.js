const Empleado = require("../models/empleadoModel");

const regexTexto = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/u;

exports.getEmpleados = (req, res) => {
  Empleado.obtenerTodos((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({ data: rows });
  });
};

exports.getEmpleadoById = (req, res) => {
  const id = req.params.id;

  Empleado.obtenerPorId(id, (err, empleado) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    return res.json({ data: empleado });
  });
};

exports.createEmpleado = (req, res) => {
  const { nombre, apellido, email, puesto, salario, tipo_documento } = req.body;

  if ([nombre, apellido, email, puesto, tipo_documento].some((valor) => valor == null || String(valor).trim() === "")) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const nombreLimpio = String(nombre).trim();
  const apellidoLimpio = String(apellido).trim();
  const emailLimpio = String(email).trim();
  const puestoLimpio = String(puesto).trim();
  const tipoDocumentoLimpio = String(tipo_documento).trim();
  const salarioNumero = Number.isFinite(Number(salario)) ? Number(salario) : 0;

  if (nombreLimpio.length < 2) {
    return res.status(400).json({ error: "El nombre debe tener al menos 2 caracteres" });
  }

  if (!regexTexto.test(nombreLimpio)) {
    return res.status(400).json({ error: "El nombre solo puede contener letras" });
  }

  if (apellidoLimpio.length < 2) {
    return res.status(400).json({ error: "El apellido debe tener al menos 2 caracteres" });
  }

  if (!regexTexto.test(apellidoLimpio)) {
    return res.status(400).json({ error: "El apellido solo puede contener letras" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
    return res.status(400).json({ error: "El email no es válido" });
  }

  if (puestoLimpio.length < 2) {
    return res.status(400).json({ error: "El puesto debe tener al menos 2 caracteres" });
  }

  if (tipoDocumentoLimpio.length < 2) {
    return res.status(400).json({ error: "El tipo de documento es obligatorio" });
  }

  Empleado.obtenerPorEmail(emailLimpio, (err, empleadoExistente) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (empleadoExistente) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    Empleado.crear(
      {
        nombre: nombreLimpio,
        apellido: apellidoLimpio,
        email: emailLimpio,
        puesto: puestoLimpio,
        salario: salarioNumero,
        tipo_documento: tipoDocumentoLimpio
      },
      (error, empleadoCreado) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({
          mensaje: "Empleado creado con éxito",
          data: empleadoCreado
        });
      }
    );
  });
};

exports.updateEmpleado = (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, email, puesto, salario, tipo_documento } = req.body;

  Empleado.obtenerPorId(id, (err, empleadoActual) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!empleadoActual) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const nombreFinal = nombre == null ? empleadoActual.nombre : String(nombre).trim();
    const apellidoFinal = apellido == null ? empleadoActual.apellido : String(apellido).trim();
    const emailFinal = email == null ? empleadoActual.email : String(email).trim();
    const puestoFinal = puesto == null ? empleadoActual.puesto : String(puesto).trim();
    const tipoDocumentoFinal = tipo_documento == null ? (empleadoActual.tipo_documento || "Cédula") : String(tipo_documento).trim();
    const salarioFinal = salario == null ? (empleadoActual.salario ?? 0) : Number(salario);

    if (nombreFinal.length < 2) {
      return res.status(400).json({ error: "El nombre debe tener al menos 2 caracteres" });
    }

    if (!regexTexto.test(nombreFinal)) {
      return res.status(400).json({ error: "El nombre solo puede contener letras" });
    }

    if (apellidoFinal.length < 2) {
      return res.status(400).json({ error: "El apellido debe tener al menos 2 caracteres" });
    }

    if (!regexTexto.test(apellidoFinal)) {
      return res.status(400).json({ error: "El apellido solo puede contener letras" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFinal)) {
      return res.status(400).json({ error: "El email no es válido" });
    }

    if (puestoFinal.length < 2) {
      return res.status(400).json({ error: "El puesto debe tener al menos 2 caracteres" });
    }

    if (tipoDocumentoFinal.length < 2) {
      return res.status(400).json({ error: "El tipo de documento es obligatorio" });
    }

    Empleado.obtenerPorEmail(emailFinal, (emailErr, empleadoConEmail) => {
      if (emailErr) {
        return res.status(500).json({ error: emailErr.message });
      }

      if (empleadoConEmail && empleadoConEmail.id !== Number(id)) {
        return res.status(409).json({ error: "El email ya está registrado" });
      }

      Empleado.actualizar(
        id,
        {
          nombre: nombreFinal,
          apellido: apellidoFinal,
          email: emailFinal,
          puesto: puestoFinal,
          salario: Number.isFinite(salarioFinal) ? salarioFinal : 0,
          tipo_documento: tipoDocumentoFinal
        },
        (updateErr, cambios) => {
          if (updateErr) {
            return res.status(500).json({ error: updateErr.message });
          }

          if (cambios === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
          }

          Empleado.obtenerPorId(id, (fetchErr, empleadoActualizado) => {
            if (fetchErr) {
              return res.status(500).json({ error: fetchErr.message });
            }

            return res.json({
              mensaje: "Empleado actualizado correctamente",
              data: empleadoActualizado
            });
          });
        }
      );
    });
  });
};

exports.deleteEmpleado = (req, res) => {
  const id = req.params.id;

  Empleado.eliminar(id, (err, cambios) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (cambios === 0) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    return res.json({ mensaje: "Empleado eliminado correctamente" });
  });
};

exports.deleteAllEmpleados = (req, res) => {
  Empleado.eliminarTodos((err, cambios) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({
      mensaje: "Todos los empleados fueron eliminados correctamente",
      eliminados: cambios
    });
  });
};