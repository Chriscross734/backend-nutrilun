const db = require('../db');

exports.getComidas = (req, res) => {
  db.query('SELECT * FROM comidas ORDER BY fecha DESC', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addComida = (req, res) => {
  const { nombre, calorias, cantidad, marca, proteinas, carbohidratos, grasas } = req.body;
  db.query(
    'INSERT INTO comidas (nombre, calorias, cantidad, marca, proteinas, carbohidratos, grasas) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, calorias, cantidad, marca, proteinas, carbohidratos, grasas],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, nombre, calorias, cantidad, marca, proteinas, carbohidratos, grasas });
    }
  );
};
