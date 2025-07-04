const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los planes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM planes_entrenamiento';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Crear un nuevo plan de entrenamiento con ejercicios
router.post('/', (req, res) => {
  const { nombre, dias } = req.body; // dias = [{ dia: 'Lunes', ejercicios: [1, 2] }]
  const insertPlan = 'INSERT INTO planes_entrenamiento (nombre) VALUES (?)';

  db.query(insertPlan, [nombre], (err, result) => {
    if (err) return res.status(500).send(err);
    const planId = result.insertId;

    const insertEjercicios = dias.flatMap(({ dia, ejercicios }) =>
      ejercicios.map(ejercicioId => [planId, ejercicioId, dia])
    );

    const query = 'INSERT INTO plan_ejercicio (plan_id, ejercicio_id, dia_semana) VALUES ?';
    db.query(query, [insertEjercicios], (err2) => {
      if (err2) return res.status(500).send(err2);
      res.send({ ok: true, planId });
    });
  });
});

// Obtener ejercicios de un plan específico
router.get('/:id', (req, res) => {
  const planId = req.params.id;
  const query = `
    SELECT e.*, p.dia_semana
    FROM plan_ejercicio p
    JOIN ejercicios e ON e.id = p.ejercicio_id
    WHERE p.plan_id = ?
  `;
  db.query(query, [planId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
