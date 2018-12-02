const express = require('express');

const router = express.Router();

const { loginUser } = require('./authController');

router.post('/login', loginUser);

module.exports = router;
