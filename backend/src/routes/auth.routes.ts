import express from 'express';
import { register, login, checkUsername,getUser,logout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.get('/check-username', checkUsername);
router.get('/user', authenticate, getUser);
router.post('/logout', authenticate, logout);
router.post('/login', login);

export default router;
