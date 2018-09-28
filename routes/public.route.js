const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const assuntoController = require('../controllers/assunto.controller');
const publicacaoController = require('../controllers/publicacao.controller');

router.get('/categoria',  categoriaController.findAllPublic);
router.get('/assunto',    assuntoController.findAllPublic);
router.get('/publicacao/:page', publicacaoController.findAllPublic);


module.exports = router;