const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/confirm/:token', authController.confirmEmail); // Route for confirming email
router.post('/forgot-password', authController.forgotPassword); // Route for requesting password reset
router.post('/reset-password', authController.resetPassword); // Route for resetting password

module.exports = router;
