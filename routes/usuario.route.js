const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

router.get('/',              controller.findAll);
router.post('/save',         controller.save);

module.exports = router;