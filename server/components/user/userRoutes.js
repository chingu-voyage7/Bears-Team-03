const express = require('express');

// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const {
  userTestRoute,
  userGetAll,
  userGetByID,
  userUpdateByID,
  userDeleteByID,
} = require('./userControllers');

router.get('/users-test-route', userTestRoute);
router.get('./user/get-all', userGetAll);
router.get('./user/get-by-id', userGetByID);
router.get('./user/update-by-id', userUpdateByID);
router.get('./user/delete-by-id', userDeleteByID);
module.exports = router;
