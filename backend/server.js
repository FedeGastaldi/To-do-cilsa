const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tareas', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Crear nueva tarea
app.post('/tasks', (req, res) => {
    const { nombre } = req.body;
    db.run('INSERT INTO tareas (nombre) VALUES (?)', [nombre], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, nombre, estado: 0 });
        }
    });
});

// Editar el nombre de una tarea
app.put('/tasks/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    db.run('UPDATE tareas SET nombre = ? WHERE id = ?', [nombre, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Tarea actualizada' });
        }
    });
});

// Marcar tarea como completada
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    db.run('UPDATE tareas SET estado = ? WHERE id = ?', [estado, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Tarea actualizada' });
        }
    });
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tareas WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Tarea eliminada' });
        }
    });
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
