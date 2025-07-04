const express = require('express');
const router = express.Router();
const db = require('../db'); // tu conexión a MySQL

// Obtener mensajes entre 2 personas
router.get('/mensajes/:usuario1/:usuario2', (req, res) => {
  const { usuario1, usuario2 } = req.params;
  console.log('GET mensajes entre:', usuario1, usuario2);

  const sql = `
    SELECT * FROM mensajes_chat
    WHERE (remitente_email = ? AND destinatario_email = ?)
       OR (remitente_email = ? AND destinatario_email = ?)
    ORDER BY timestamp ASC
  `;
  db.query(sql, [usuario1, usuario2, usuario2, usuario1], (err, results) => {
    if (err) {
      console.error('Error al obtener mensajes:', err);
      return res.status(500).json({ error: 'Error al obtener mensajes' });
    }
    res.json(results);
  });
});

// Enviar nuevo mensaje
router.post('/mensajes', (req, res) => {
  const { remitente_email, destinatario_email, mensaje } = req.body;
  console.log('POST mensaje recibido:', req.body);

  const sql = `
    INSERT INTO mensajes_chat (remitente_email, destinatario_email, mensaje)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [remitente_email, destinatario_email, mensaje], (err, result) => {
    if (err) {
      console.error('Error al enviar mensaje:', err);
      return res.status(500).json({ error: 'Error al enviar mensaje' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Obtener lista de usuarios que enviaron mensajes al nutriólogo
router.get('/usuarios-que-escribieron', (req, res) => {
  const emailNutriologo = 'nutriologo@ejemplo.com'; // o de forma dinámica si quieres

  const sql = `
    SELECT DISTINCT remitente_email FROM mensajes_chat
    WHERE destinatario_email = ?
  `;

  db.query(sql, [emailNutriologo], (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    const usuarios = results.map((row) => row.remitente_email);
    res.json(usuarios);
  });
});

// Obtener mensajes no leídos agrupados por remitente para un destinatario
router.get('/mensajes-no-leidos/:email', (req, res) => {
  const emailDestino = req.params.email;

  const sql = `
    SELECT remitente_email as email, COUNT(*) as cantidad
    FROM mensajes_chat
    WHERE destinatario_email = ? AND leido = 0
    GROUP BY remitente_email
  `;

  db.query(sql, [emailDestino], (err, results) => {
    if (err) {
      console.error('Error al obtener mensajes no leídos:', err);
      return res.status(500).json({ error: 'Error al obtener mensajes no leídos' });
    }
    res.json(results); // devuelve array [{email: "x", cantidad: n}, ...]
  });
});

// Marcar mensajes como leídos entre remitente y destinatario
router.post('/marcar-leidos', (req, res) => {
  const { remitente, destinatario } = req.body;

  const sql = `
    UPDATE mensajes_chat
    SET leido = 1
    WHERE remitente_email = ? AND destinatario_email = ?
  `;

  db.query(sql, [remitente, destinatario], (err) => {
    if (err) {
      console.error('Error al marcar mensajes como leídos:', err);
      return res.status(500).json({ error: 'Error al actualizar estado de lectura' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
