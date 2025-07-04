const express = require('express');
const router = express.Router();
const {
  obtenerDietas,
  crearDieta,
  editarDieta,
  eliminarDieta,
  asignarDieta,
  obtenerDietaUsuario,
  obtenerDietaPorCorreo,
} = require('../controllers/dietaController');

router.get('/', obtenerDietas);
router.post('/', crearDieta);
router.put('/:id', editarDieta);
router.delete('/:id', eliminarDieta);
router.post('/asignar', asignarDieta);
router.get('/usuario/:usuario_id', obtenerDietaUsuario);
router.get('/correo/:email', obtenerDietaPorCorreo);

module.exports = router;
