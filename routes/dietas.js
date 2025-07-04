const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las dietas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM dietass';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener dietas:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Crear una dieta
router.post('/', (req, res) => {
  const { nombre, desayuno, comida, cena } = req.body;

  if (!nombre || !desayuno || !comida || !cena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = 'INSERT INTO dietass (nombre, desayuno, comida, cena) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, desayuno, comida, cena], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar dieta:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: '✅ Dieta creada', id: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, desayuno, comida, cena } = req.body;

  if (!nombre || !desayuno || !comida || !cena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.query(
    'UPDATE dietass SET nombre = ?, desayuno = ?, comida = ?, cena = ? WHERE id = ?',
    [nombre, desayuno, comida, cena, id],
    (err) => {
      if (err) {
        console.error('❌ Error al actualizar dieta:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ mensaje: '✅ Dieta actualizada' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM dietass WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('❌ Error al eliminar dieta:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ mensaje: '✅ Dieta eliminada' });
  });
});
exports.obtenerDietaPorCorreo = (req, res) => {
  const { email } = req.params;

  const query = `
    SELECT d.* FROM dietass d
    INNER JOIN usuario_dietas ud ON d.id = ud.dieta_id
    INNER JOIN usuarios u ON ud.usuario_id = u.id
    WHERE u.email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


const asignarDieta = (req, res) => {
  const { usuario_id, dieta_id } = req.body;

  if (!usuario_id || !dieta_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: usuario_id y dieta_id' });
  }

  const query = 'INSERT INTO asignadas (usuario_id, dieta_id) VALUES (?, ?)';
  db.query(query, [usuario_id, dieta_id], (err, result) => {
    if (err) {
      console.error('❌ Error al asignar dieta:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ mensaje: '✅ Dieta asignada al usuario', asignacion_id: result.insertId });
  });
};

module.exports = router;
module.exports.asignarDieta = asignarDieta;
