import { getAllVendors, getVendorDetails, updateVendorDetails } from '../controllers/vendorController';
import { Request, Response } from 'express';

import express from 'express';
import { authMiddleWare } from '../middlewares/middleware';

const router = express.Router();

router.get('/', authMiddleWare, getAllVendors); //ADMIN
router.get('/details/:vendorId', authMiddleWare, getVendorDetails);
router.put('/', authMiddleWare, updateVendorDetails);

export default router;
//cm52tz7wt0000w7akalv9bhxg
