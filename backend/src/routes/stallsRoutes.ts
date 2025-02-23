import express from 'express';
import { createStall, getAllStalls, getAllStallsByVendorId } from '../controllers/stallController';

const router = express.Router();

router.post('/', createStall);
router.get('/', getAllStalls); //Admin
router.post('/vendor', getAllStallsByVendorId);
// router.get("/:id",getStallDeatils)

export default router;
