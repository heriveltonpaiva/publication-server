const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

router.get('/',              controller.findAll);
router.get('/:page',         controller.findAllPagination);
router.get('/byId/:id',      controller.findById);
router.post('/save',         controller.save);

module.exports = router;