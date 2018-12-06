const express = require('express');
const authMW = require('../custom_middlewares/authorizationMW');
// Middleware-like object that allow to 'pack' routes based on components
const router = express.Router();

const {
  businessCreateOne,
  businessGetAll,
  businessGetByVAT,
  businessGetByName,
  businessUpdateById,
  businessDeleteById,
} = require('./businessControllers');

router.get('/get-all', businessGetAll);
router.get('/get-by-vat', businessGetByVAT);
router.get('/get-by-name', businessGetByName);
router.post('/create-one', authMW, businessCreateOne);
router.patch('/update-by-id', authMW, businessUpdateById);
router.delete('/delete-by-id', authMW, businessDeleteById);
module.exports = router;
