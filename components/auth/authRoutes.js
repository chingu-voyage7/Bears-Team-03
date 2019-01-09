const express = require('express');

const router = express.Router();

const { loginUser, verifyToken } = require('./authController');
const validator = require('../custom_middlewares/validationMw');

router.post('/login', validator, loginUser);
router.post('/verify-token', verifyToken);


module.exports = router;
