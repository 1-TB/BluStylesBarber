import express from "express"
import { register, login, forgotPassword, resetPassword } from "../controller/authController.mjs";
import { authenticateToken } from "../middleware/authenticateToken.mjs";

const router = express.Router();

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.post('/api/auth/forgot-password', forgotPassword);
router.post('/api/auth/reset-password', authenticateToken , resetPassword);

export default router;