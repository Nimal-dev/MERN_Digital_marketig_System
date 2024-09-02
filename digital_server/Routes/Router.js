const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')
// const sosController = require('../Controllers/sosController');
// const notificationController = require('../Controllers/notificationController');

//--------------------SIGNUP ROUTE---------------------- //
router.post('/signup', authController.signup);
router.post('/providerSignup', authController.providerSignup);
router.post('/entrepreneurSignup', authController.entrepreneurSignup);

//--------------------SIGNIN ROUTE---------------------- //
router.post('/signin', authController.signin);


module.exports = router;
