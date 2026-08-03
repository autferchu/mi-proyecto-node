const db = require("../database/database");

// Obtener todos los empleados
exports.obtenerEmpleados = (req, res) => {

    db.all("SELECT * FROM empleados", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);

    });

};
// Crear empleado
exports.crearEmpleado = (req, res) => {

    const { nombre, apellido, email, puesto, salario } = req.body;

    if (!nombre || !apellido || !email || !puesto || salario == null) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        INSERT INTO empleados(nombre, apellido, email, puesto, salario)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [nombre, apellido, email, puesto, salario],
        function(err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                nombre,
                apellido,
                email,
                puesto,
                salario
            });

        }
    );

};
// Obtener un empleado por ID
exports.obtenerEmpleado = (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM empleados WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    mensaje: "Empleado no encontrado"
                });
            }

            res.json(row);

        }
    );

};
