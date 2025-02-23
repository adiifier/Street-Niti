import { PrismaClient } from '@prisma/client';
import { userRequest } from '../middlewares/middleware';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { createStallSchema } from '../types/types';

dotenv.config();

const prisma = new PrismaClient();
function validateInput(validationResult: any) {
  if (!validationResult.success) {
    console.log(' Zod Validation Error', validationResult.error.errors);
    return false;
  }
  return true;
}

export const createStall = async (req: userRequest, res: Response) => {
  const validationResult = createStallSchema.safeParse(req.body);
  if (!validateInput(validationResult)) {
    res.status(404).json({ message: 'Input Validation Failed' });
    return;
  }

  try {
    const vendor = await prisma.vendor.findFirst({ where: { userId: req.user?.id } });
    if (!vendor) {
      res.status(403).json({ message: 'Vendor Not Found' });
      return;
    }

    const stall = await prisma.stall.create({
      data: {
        name: req.body.name,
        location: req.body.location,
        vendorId: vendor.vendorId,
        size: req.body.size,
      },
    });

    res.status(200).json({ message: 'Stall created successfully', stall: stall });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occurred' });
    return;
  }
};

export const getAllStalls = async (req: userRequest, res: Response) => {
  try {
    const stalls = await prisma.stall.findMany({});
    res.status(200).json(stalls);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occurred' });
    return;
  }
};

export const getAllStallsByVendorId = async (req: userRequest, res: Response) => {
  try {
    const stalls = await prisma.stall.findMany({ where: { vendorId: req.body.vendorId } });
    res.status(200).json(stalls);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occurred' });
    return;
  }
};

export const getStallDetails = async (req: userRequest, res: Response) => {
  try {
    const stall = await prisma.stall.findFirst({ where: { stallId: req.body.stallId } });
    res.status(200).json(stall);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occurred' });
    return;
  }
};
