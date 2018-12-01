const express = require('express');

const router = express.Router();

const { loginController } = require('./authController');

router.post('/login', loginController);

module.exports = router;
