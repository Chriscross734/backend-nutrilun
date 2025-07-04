const db = require('../db');

// Obtener todas las dietas
exports.obtenerDietas = (req, res) => {
  db.query('SELECT * FROM dietas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Crear una dieta
exports.crearDieta = (req, res) => {
  const { nombre, descripcion } = req.body;
  db.query('INSERT INTO dietas (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, nombre, descripcion });
  });
};

// Editar una dieta
exports.editarDieta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  db.query(
    'UPDATE dietas SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: 'Dieta actualizada' });
    }
  );
};


// Eliminar una dieta
exports.eliminarDieta = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM dietas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Dieta eliminada' });
  });
};

// Asignar dieta a usuario
exports.asignarDieta = (req, res) => {
  const { usuario_id, dieta_id } = req.body;
  db.query(
    'INSERT INTO usuario_dietass (usuario_id, dieta_id) VALUES (?, ?)',
    [usuario_id, dieta_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: 'Dieta asignada al usuario' });
    }
  );
};

// Obtener dieta por usuario
exports.obtenerDietaUsuario = (req, res) => {
  const { usuario_id } = req.params;
  db.query(
    `SELECT d.* FROM dietas d
     INNER JOIN usuario_dietas ud ON d.id = ud.dieta_id
     WHERE ud.usuario_id = ?`,
    [usuario_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};
