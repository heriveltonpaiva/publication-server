const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoria.controller');

router.get('/',                            controller.findAll);
router.get('/:page',                       controller.findAllPagination);
router.get('/byId/:id',                    controller.findById);
router.put('/update/:id',                  controller.update);
router.put('/updateAreaPublica/:id',       controller.updatePublicArea);
router.post('/save',                       controller.save);
router.delete('/delete/:id',               controller.delete);

module.exports = router;