import express from 'express';
import { Response, Request } from 'express';
import { registerUser, signInUser } from '../controllers/authController';
import { authMiddleWare } from '../middlewares/middleware';

const router = express.Router();

router.post('/sign-up', registerUser);
router.post('/sign-in', signInUser);

export default router;
