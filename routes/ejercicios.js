const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM ejercicios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
router.post('/', (req, res) => {
  const { nombre, descripcion, grupo_muscular } = req.body;
  const query = 'INSERT INTO ejercicios (nombre, descripcion, grupo_muscular) VALUES (?, ?, ?)';
  db.query(query, [nombre, descripcion, grupo_muscular], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ ok: true, id: result.insertId });
  });
});

module.exports = router;
