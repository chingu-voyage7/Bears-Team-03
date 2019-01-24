const express = require('express');
const authMW = require('../custom_middlewares/authorizationMW');
const validator = require('../custom_middlewares/validationMw');

const router = express.Router();

const {
  projectCreateOne,
  projectGetAll,
  projectGetByName,
  projectUpdateById,
  projectDeleteById,
  projectSetApplicantState,
  projectToggleSubscription,
} = require('./projectController');

router.get('/get-all', projectGetAll);
router.get('/get-by-name', projectGetByName);
router.post('/create-one', validator, authMW, projectCreateOne);
router.patch('/update-by-id', validator, authMW, projectUpdateById);
router.patch('/applicant/subscription', authMW, projectToggleSubscription);
router.patch('/applicant/set-status', authMW, projectSetApplicantState);
router.delete('/delete-by-id', authMW, projectDeleteById);
module.exports = router;
