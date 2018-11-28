const express = require('express');

// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const { userTestRoute } = require('./userControllers');

router.get('/users-test-route', userTestRoute);

module.exports = router;
