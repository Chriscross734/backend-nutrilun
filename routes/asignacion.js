const express = require('express');
const router = express.Router();
const {
  asignarDietaUsuario,
  obtenerDietaPorCorreo,
} = require('../controllers/asignacionController');

router.post('/asignar', asignarDietaUsuario);
router.get('/buscar/:email', obtenerDietaPorCorreo);

module.exports = router;
