const express = require('express');
const router = express.Router();
const comidasController = require('../controllers/comidasController');

router.get('/', comidasController.getComidas);
router.post('/', comidasController.addComida);

module.exports = router;


