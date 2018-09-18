const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicacao.controller');

router.get('/',                      controller.findAll);
router.get('/:page',                 controller.findAllPagination);
router.get('/byId/:id',              controller.findById);
router.get('/byAssunto/:id',         controller.findByTopic);
router.post('/save',                 controller.save);
router.put('/update/:id',            controller.update);
router.put('/updateAreaPublica/:id', controller.updatePublicArea);
router.delete('/delete/:id',         controller.delete);

module.exports = router;