const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const express = require('express'); 

const app = express(); 

// [Opcional] Esto permite que tu API entienda datos en formato JSON cuando uses POST/PUT
app.use(express.json()); 

// 1. CONFIGURACIÓN DE LA BASE DE DATOS
const dbPath = path.join(__dirname, 'database.db'); 

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado exitosamente a SQLite en:', dbPath);
    }
});

// 2. CREACIÓN DE LA TABLA
db.run(`
  CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    puesto TEXT,
    salario REAL
  )
`, (err) => {
    if (err) {
        console.error('Error al verificar la tabla empleados:', err.message);
    } else {
        console.log('Tabla "empleados" lista para operar.');
    }
});

// 3. AGREGAR LA BASE DE DATOS A EXPRESS
app.locals.db = db; 

// ========================================================
// 4. AQUÍ PEGAMOS LA RUTA (Debajo de la configuración y antes del export)
// ========================================================
app.get('/empleados', (req, res) => {
    const baseDeDatos = req.app.locals.db; 
    
    baseDeDatos.all('SELECT * FROM empleados', [], (err, filas) => {
        if (err) return res.status(500).send(err.message);
        res.json(filas); // Te devolverá un array vacío [] porque aún no hay datos
    });
});
// ========================================================
// RUTA POST: Para agregar un nuevo empleado
// ========================================================
app.post('/empleados', (req, res) => {
    const baseDeDatos = req.app.locals.db;
    // Extraemos los datos que vienen en el cuerpo de la petición
    const { nombre, puesto, salario } = req.body;

    // Validación básica por si se olvidan del nombre
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const sql = `INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)`;
    
    // Ejecutamos la inserción. Usamos "this.lastID" para saber qué ID le asignó SQLite
    baseDeDatos.run(sql, [nombre, puesto, salario], function(err) {
        if (err) return res.status(500).send(err.message);
        
        res.status(201).json({
            mensaje: 'Empleado creado con éxito',
            id: this.lastID
        });
    });
});

// ========================================================
// RUTA PUT: Para modificar un empleado existente por su ID
// ========================================================
app.put('/empleados/:id', (req, res) => {
    const baseDeDatos = req.app.locals.db;
    const { id } = req.params; // El ID viene en la URL, ej: /empleados/5
    const { nombre, puesto, salario } = req.body;

    const sql = `UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?`;

    baseDeDatos.run(sql, [nombre, puesto, salario, id], function(err) {
        if (err) return res.status(500).send(err.message);
        
        // "this.changes" te dice cuántas filas se modificaron en la base de datos
        if (this.changes === 0) {
            return res.status(404).json({ error: 'No se encontró ningún empleado con ese ID' });
        }

        res.json({ mensaje: 'Empleado actualizado con éxito' });
    });
});
// ========================================================

// 5. EXPORTAR 'app' PARA index.js
module.exports = app;