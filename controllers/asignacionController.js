const db = require('../db');

exports.asignarDietaUsuario = (req, res) => {
  const { email_usuario, dieta_id } = req.body;

  if (!email_usuario || !dieta_id) {
    return res.status(400).json({ message: 'Faltan campos' });
  }

  const query = 'INSERT INTO dietausuario (email_usuario, dieta_id) VALUES (?, ?)';
  db.query(query, [email_usuario, dieta_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '✅ Dieta asignada', id: result.insertId });
  });
};

exports.obtenerDietaPorCorreo = (req, res) => {
  const { email } = req.params;

  const query = `
    SELECT d.* FROM dietass d
    INNER JOIN dietausuario du ON d.id = du.dieta_id
    WHERE du.email_usuario = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: 'No se encontraron dietas' });
    res.json(results);
  });
};
