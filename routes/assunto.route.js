const express = require('express');
const router = express.Router();
const controller = require('../controllers/assunto.controller');

router.get('/',              controller.findAll);
router.get('/byCategoria/:id',controller.findByCategory);
router.post('/save',         controller.save);
router.delete('/delete/:id', controller.delete);

module.exports = router;