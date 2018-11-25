const express = require('express');

// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const { usersTestRoute } = require('./usersControllers');

router.get('/users-test-route', usersTestRoute);

module.exports = router;
