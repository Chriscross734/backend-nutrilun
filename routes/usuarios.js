const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios (sin contraseñas)
router.get('/usuarios', (req, res) => {
  const query = 'SELECT id, email, rol FROM usuarios'; // Trae id, email y rol
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
});

module.exports = router;
