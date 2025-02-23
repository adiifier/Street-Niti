import express from 'express';
import { getAllAdmins } from '../controllers/adminController';
import { authMiddleWare } from '../middlewares/middleware';
const router = express.Router();

router.get('/super', authMiddleWare, getAllAdmins); //SUPERADMIN
// router.get('/:adminId', getAdminDetails);
// router.put('/:adminId', updateAdminDetails);

export default router;
