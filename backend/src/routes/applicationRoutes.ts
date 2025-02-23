import express from 'express';
import {
  createNewApplication,
  getAllApplications,
  getApplicationById,
  getApplicationByVendorId,
  updateApplicationStatus,
  getFilteredApplications,
} from '../controllers/applicationController';
import { authMiddleWare } from '../middlewares/middleware';
const router = express.Router();

router.post('/', authMiddleWare, createNewApplication);
router.get('/admin', authMiddleWare, getAllApplications); // ADMIN
router.post('/vendor', authMiddleWare, getApplicationById);
router.get('/vendor', authMiddleWare, getApplicationByVendorId);
router.post('/admin/status', authMiddleWare, updateApplicationStatus);
router.get('/admin/:status', authMiddleWare, getFilteredApplications);

export default router;
