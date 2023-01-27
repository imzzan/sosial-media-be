import express from 'express';
import { login, regsiter, getUser } from '../controller/auth.js';
import { verifyToken } from './../middleware/auth.js';

const router = express.Router();

router.post('/register', regsiter)
router.post('/login', login);
router.get('/getuser',verifyToken, getUser);


export default router