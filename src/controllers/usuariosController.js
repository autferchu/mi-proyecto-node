const db = require("../database/database");
// Arriba del todo en usuariosController.js
let usuarios = []; 

exports.crearUsuario = (req, res) => {

    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    db.run(
        "INSERT INTO usuarios(nombre) VALUES(?)",
        [nombre],
        function(err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                id: this.lastID,
                nombre
            });

        }
    );

};

// Obtener todos
exports.obtenerUsuarios = (req, res) => {

    db.all("SELECT * FROM usuarios", [], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

};
// Obtener uno
exports.obtenerUsuario = (req, res) => {
    const id = req.params.id;

    db.get(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.json(row);
        }
    );
};

// Crear
exports.crearUsuario = (req, res) => {

    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    const nuevo = {
        id: usuarios.length + 1,
        nombre
    };

    usuarios.push(nuevo);

    res.status(201).json(nuevo);
};

// Actualizar
exports.actualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    db.run(
        "UPDATE usuarios SET nombre = ? WHERE id = ?",
        [nombre, id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.json({
                id,
                nombre
            });
        }
    );
};

// Eliminar
exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;

    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.json({
                mensaje: "Usuario eliminado correctamente"
            });
        }
    );
};
// src/controllers/userController.js
const userService = require('../services/userService');

const getUsuarios = (req, res) => {
  const usuarios = userService.obtenerTodosLosUsuarios();
  res.json({
    ok: true,
    data: usuarios
  });
};

module.exports = {
  getUsuarios
};


