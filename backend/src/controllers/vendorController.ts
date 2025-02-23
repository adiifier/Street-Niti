import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { userRequest } from '../middlewares/middleware';
import { updateVendorDetailsSchema, updateVendorDetailsType, vendorSignUpSchema } from '../types/types';
import { vendorUpdateType } from '../types/vendorRouteTypes';
import { object } from 'zod';

const prisma = new PrismaClient();

//ZOD Validation Function
function validateInput(validationResult: any) {
  if (!validationResult.success) {
    console.log(' Zod Validation Error', validationResult.error.errors);
    return false;
  }
  return true;
}

//GET ALL VENDORS ROUTE
export const getAllVendors = async (req: userRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You are not authorized to access this ' });
      return;
    }
    const vendor = await prisma.user.findMany({
      where: {
        role: 'vendor',
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

    res.status(200).json(vendor);
    return;
  } catch (error) {
    console.log('Error in Get all vendors route' + error);
    res.status(500).json('Some error occured');
    return;
  }
};

//GET VENDOR BY ID ROUTE
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

//UPDATE VENDOR DETAILS
export const updateVendorDetails = async (req: userRequest, res: Response) => {
  try {
    const body = req.body;
    const validationResult = updateVendorDetailsSchema.safeParse(body);
    if (!validateInput(validationResult)) {
      res.status(404).json({ message: 'Input Validation Failed ' });
      return;
    }

    const updateData: any = validationResult.data;

    const updatePayload: {
      firstName?: string;
      lastName?: string;
      email?: string;
      vendor?: { buisnessName?: string; address?: string };
    } = {};
    if (updateData.firstName) updatePayload.firstName = updateData.firstName;
    if (updateData.lastName) updatePayload.lastName = updateData.lastName;
    if (updateData.email) updatePayload.email = updateData.email;

    if (updateData.vendor) {
      // Initialize vendor object in updatePayload
      updatePayload.vendor = {
        buisnessName: updateData.vendor.buisnessName ?? undefined,
        address: updateData.vendor.address ?? undefined,
      };
    }

    if (updateData.email) {
      const checkEmail = await prisma.user.findFirst({
        where: { email: updateData.email },
      });
      if (checkEmail) {
        res.status(403).json({ message: 'Email Already used' });
        return;
      }
    }

    try {
      const updateVendor = await prisma.user.update({
        where: {
          id: req.user?.id,
        },
        data: {
          ...updatePayload,

          vendor: {
            update: {
              buisnessName: updatePayload.vendor?.buisnessName || undefined,
              address: updatePayload.vendor?.address || undefined,
            },
          },
        },
      });

      if (updateVendor) {
        res.status(200).json({
          message: 'Details updates succesfully',
          details: updateVendor,
        });
        return;
      }
    } catch (error) {
      console.log('Error in Update Vendor Details Route' + error),
        res.status(500).json({ message: 'Some error ocurred' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
