const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear
router.post('/', (req, res) => {
  const { nombre, descripcion, dificultad, duracion } = req.body;
  db.query(
    'INSERT INTO rutinas (nombre, descripcion, dificultad, duracion) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, dificultad, duracion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Leer
router.get('/', (req, res) => {
  db.query('SELECT * FROM rutinas', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM rutinas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// Actualizar
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, dificultad, duracion } = req.body;
  db.query(
    'UPDATE rutinas SET nombre=?, descripcion=?, dificultad=?, duracion=? WHERE id=?',
    [nombre, descripcion, dificultad, duracion, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    }
  );
});

// Eliminar
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM rutinas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

module.exports = router;
