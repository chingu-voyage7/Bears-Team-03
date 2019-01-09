const express = require('express');

const authMW = require('../custom_middlewares/authorizationMW');
const validator = require('../custom_middlewares/validationMw');

// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const {
  userCreateOne,
  userGetAll,
  userGetByID,
  userUpdateByID,
  userDeleteByID,
} = require('./userControllers');

router.get('/get-all', userGetAll);
router.post('/register', validator, userCreateOne);
router.get('/get-by-id', authMW, userGetByID);
router.patch('/update-by-id', authMW, userUpdateByID);
router.delete('/delete-by-id', authMW, userDeleteByID);
module.exports = router;
