const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Login
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT rol FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).json({ success: false, error: 'Error interno' });

      if (results.length > 0) {
        res.json({ success: true, role: results[0].rol });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      } 
    });
  });

  // Registro
  router.post('/register', (req, res) => {
    const { email, password, rol } = req.body;

    if (!email || !password || !rol) {
      return res.status(400).json({ success: false, message: 'Faltan datos' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Error interno' });

      if (results.length > 0) {
        return res.status(409).json({ success: false, message: 'Usuario ya existe' });
      }

      const query = 'INSERT INTO usuarios (email, password, rol) VALUES (?, ?, ?)';
      db.query(query, [email, password, rol], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al crear usuario' });

        res.json({ success: true, message: 'Usuario creado correctamente' });
      });
    });
  });

  return router;
};
