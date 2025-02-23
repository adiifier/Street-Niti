import express from 'express';
import { z } from 'zod';
import { Response, Request } from 'express';
import { userRequest } from '../middlewares/middleware';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//GET ALL ADMINS (SUPERADMINROUTE)
export const getAllAdmins = async (req: userRequest, res: Response) => {
  try {
    if (req.user?.role !== 'superAdmin') {
      res.status(403).json({ message: 'You are not authorized to access this ' });
      return;
    }
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
      include: {
        admin: true,
      },
    });

    res.status(200).json(admins);
    return;
  } catch (error) {
    console.log('Error in Get all SuperAdmin route' + error);
    res.status(500).json('Some error occured');
    return;
  }
};

//GET ADMIN DETAILS ROUTE

export const getVendorDetails = async (req: userRequest, res: Response) => {
  try {
    const userId = req.params.vendorId;

    if (req.user?.role !== 'vendor' || req.user?.id !== userId) {
      res.status(403).json({ message: 'You are not authorized to access this vendor' });
      return;
    }
    const vendorDetails = await prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        vendor: {
          include: {
            applications: true,
            stalls: true,
          },
        },
      },
    });

    res.status(200).json(vendorDetails);
  } catch (error) {
    console.log('Error in Get vendor details route' + error);
    res.status(500).json({ message: 'Some error occured' });
    return;
  }
};
