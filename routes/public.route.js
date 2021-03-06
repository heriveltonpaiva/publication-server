const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const assuntoController = require('../controllers/assunto.controller');
const publicacaoController = require('../controllers/publicacao.controller');
const usuarioController = require('../controllers/usuario.controller');

router.get('/categoria',  categoriaController.findAllPublic);
router.get('/assunto',    assuntoController.findAllPublic);
router.get('/publicacao/:page', publicacaoController.findAllPublic);
router.get('/publicacao/byId/:id', publicacaoController.findById);

router.post('/usuario',  usuarioController.save);
router.get('/usuario/byId/:id', usuarioController.findById);

module.exports = router;