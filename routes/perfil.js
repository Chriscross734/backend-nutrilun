const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los perfiles
router.get('/', (req, res) => {
  db.query('SELECT * FROM perfil', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener perfil por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM perfil WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(results[0]);
  });
});

// Obtener perfil por correo
router.get('/correo/:correo', (req, res) => {
  const { correo } = req.params;
  db.query('SELECT * FROM perfil WHERE correo = ?', [correo], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(results[0]);
  });
});

// Crear nuevo perfil
router.post('/', (req, res) => {
  const { nombre, peso, altura, objetivos, preferencias, restricciones, correo } = req.body;

  db.query(
    `INSERT INTO perfil (nombre, peso, altura, objetivos, preferencias, restricciones, correo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, peso, altura, objetivos, preferencias, restricciones, correo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Actualizar perfil
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, peso, altura, objetivos, preferencias, restricciones, correo } = req.body;
  db.query(
    `UPDATE perfil SET nombre=?, peso=?, altura=?, objetivos=?, preferencias=?, restricciones=?, correo=? WHERE id=?`,
    [nombre, peso, altura, objetivos, preferencias, restricciones, correo, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.sendStatus(200);
    }
  );
});

// Eliminar perfil
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM perfil WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
});
// Obtener perfil por correo
router.get('/correo/:email', (req, res) => {
  const { email } = req.params;
  db.query('SELECT * FROM perfil WHERE correo = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(results[0]);
  });
});

module.exports = router;
