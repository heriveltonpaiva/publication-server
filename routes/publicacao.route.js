const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicacao.controller');

router.get('/',              controller.findAll);
router.get('/:id',           controller.findById);
router.post('/save',         controller.save);
router.put('/update/:id',    controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;