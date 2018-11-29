const express = require('express');

// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const {
  userCreateOne,
  userTestRoute,
  userGetAll,
  userGetByID,
  userUpdateByID,
  userDeleteByID,
} = require('./userControllers');

router.get('/users-test-route', userTestRoute);
router.get('/get-all', userGetAll);
router.get('/get-by-id', userGetByID);
router.post('/register', userCreateOne);
router.patch('/update-by-id', userUpdateByID);
router.delete('/delete-by-id', userDeleteByID);
module.exports = router;
