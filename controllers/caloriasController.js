exports.calcularCalorias = (req, res) => {
  const { genero, peso, altura, edad, actividad, objetivo } = req.body;

  if (!genero || !peso || !altura || !edad || !actividad || !objetivo) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  let mb;

  if (genero === 'mujer') {
    mb = 10 * peso + 6.25 * altura - 5 * edad - 161;
  } else {
    mb = 10 * peso + 6.25 * altura - 5 * edad + 5;
  }

  let factorActividad = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    intenso: 1.725,
  }[actividad] || 1.2;

  let get = mb * factorActividad;

  if (objetivo === 'bajar') get -= 500;
  else if (objetivo === 'subir') get += 500;

  res.json({ mb: Math.round(mb), get: Math.round(get) });
};
