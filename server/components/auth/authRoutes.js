const express = require('express');

const router = express.Router();

const { loginUser } = require('./authController');
const validator = require('../custom_middlewares/validationMw');

router.post('/login', validator, loginUser);

module.exports = router;
