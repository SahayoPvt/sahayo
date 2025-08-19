import express from 'express';
import { login } from '../controllers/authcontrollers.js';
const router = express.Router();

router.post("/auth/google", login);

export default router;
