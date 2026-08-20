const { body, validationResult } = require("express-validator");

const validarEmpleado = [

  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Debe ingresar un email válido"),

  body("puesto")
    .trim()
    .notEmpty()
    .withMessage("El puesto es obligatorio"),

  body("salario")
    .isFloat({ min: 1 })
    .withMessage("El salario debe ser mayor que 0"),

  (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array()
      });
    }

    next();
  }

];

module.exports = validarEmpleado;
const validarEmpleado = require("../middlewares/empleadoValidator");