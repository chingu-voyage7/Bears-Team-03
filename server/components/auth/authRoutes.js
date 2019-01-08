const express = require('express');

const router = express.Router();

const { loginUser, verifyToken } = require('./authController');

router.post('/login', loginUser);
router.post('/verify-token', verifyToken);

module.exports = router;
