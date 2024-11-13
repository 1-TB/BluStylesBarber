const express = require('express')
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require("../controller/authController")
const {authenticateToken} = require("../middleware/authenticateToken")

const router = express.Router();

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.post('/api/auth/forgot-password', forgotPassword);
router.post('/api/auth/reset-password', authenticateToken , resetPassword);

module.exports = router;