const express = require('express');
const router = express.Router();
const controller = require('../controllers/authentication.controller');

router.post('/', controller.createAuthenticationTokenJWT);
module.exports = router;