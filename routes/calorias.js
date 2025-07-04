const express = require('express');
const router = express.Router();
const { calcularCalorias } = require('../controllers/caloriasController');

router.post('/calcular', calcularCalorias);

module.exports = router;


// archivo: controllers/caloriasController.js
exports.calcularCalorias = (req, res) => {
  const { genero, peso, altura, edad, actividad, objetivo } = req.body;

  if (!genero || !peso || !altura || !edad || !actividad || !objetivo) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  let mb = 0;
  if (genero === 'mujer') {
    mb = 14.818 * peso + 486.6;
  } else if (genero === 'hombre') {
    mb = 15.057 * peso + 692.2;
  } else {
    return res.status(400).json({ error: 'Género no válido' });
  }

  const factores = {
    sedentario: 1.4,
    ligero: 1.69,
    moderado: 1.76,
    intenso: 2.1
  };

  const factorActividad = factores[actividad];
  if (!factorActividad) {
    return res.status(400).json({ error: 'Nivel de actividad no válido' });
  }

  let get = mb * factorActividad;

  if (objetivo === 'mantener') {
    // no cambia
  } else if (objetivo === 'bajar') {
    get -= 500;
  } else if (objetivo === 'subir') {
    get += 500;
  } else {
    return res.status(400).json({ error: 'Objetivo no válido' });
  }

  res.json({ mb: mb.toFixed(2), get: get.toFixed(2) });
};