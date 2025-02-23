import { PrismaClient } from '@prisma/client';
import { userRequest } from '../middlewares/middleware';
import { Response } from 'express';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
import { createApplicationSchema, createApplicationType, updateApplicationStatusSchema } from '../types/types';
import dotenv from 'dotenv';

dotenv.config();

//ADDING SUPABASE INITIALIZATION
if (!process.env.SUPABASE_BUCKET_URL) {
  throw new Error(' Supabase Bucket Url  is not defined');
}
if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error('Supabase Anon Key is not defined');
}
const supabase = createClient(process.env.SUPABASE_BUCKET_URL, process.env.SUPABASE_ANON_KEY);

const prisma = new PrismaClient();
function validateInput(validationResult: any) {
  if (!validationResult.success) {
    console.log(' Zod Validation Error', validationResult.error.errors);
    return false;
  }
  return true;
}

export const createNewApplication = async (req: userRequest, res: Response) => {
  const body = req.body;

  if (req.files) {
    const image = req.files.image;
    let publicUrl: any;
    const files = Array.isArray(image) ? image : [image];
    try {
      for (const file of files) {
        const uniqueFileName = `${uuid()}-${file.name}`;

        const { data, error } = await supabase.storage
          .from('Project')
          .upload(`${uniqueFileName}`, file.data, { cacheControl: '3600' });

        if (error) {
          throw new Error('Error Uploading the image');
        }
        publicUrl = await supabase.storage.from('Project').getPublicUrl(`${uniqueFileName}`).data.publicUrl;
        console.log(publicUrl);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json('Some error occurred while uploading image');
      return;
    }
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user?.id } });
    const vendorId = vendor?.vendorId;

    try {
      const application = await prisma.application.create({
        data: {
          vendor: {
            connect: {
              vendorId: vendorId,
            },
          },
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,

          images: {
            create: {
              imageUrl: publicUrl,
            },
          },
        },
      });
      res.status(200).json({ message: 'Application created Succesfully' });
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Some error occured in the server' });
    }
  }

  const validationResult = createApplicationSchema.safeParse(body);
  if (!validateInput(validationResult)) {
    res.status(403).json({ message: 'Input Validation Failed' });
    return;
  }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user?.id,
      },
    });

    if (!vendor) {
      res.status(403).json({ message: 'Vendor Not Found' });
      return;
    }

    const appllication = await prisma.application.create({
      data: {
        vendorId: vendor.vendorId,
        title: body.title,
        description: body.description,
        location: body.location,
      },
    });

    if (appllication) {
      res.status(200).json({ message: 'Application Created Succesfully' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Some error occurred' });
    return;
  }
};

export const getAllApplications = async (req: userRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }
    if (user?.role !== 'admin') {
      res.status(403).json({ message: 'You are not authorized to access this page' });
      return;
    }

    const applications = await prisma.application.findMany({ include: { images: { select: { imageUrl: true } } } });
    if (applications) {
      res.status(200).json(applications);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error occured' });

    return;
  }
};

export const getApplicationById = async (req: userRequest, res: Response) => {
  try {
    const body = req.body;
    const application: object = (await prisma.application.findFirst({ where: { applicationId: body.id } })) ?? {};
    if (application) {
      res.status(200).json(application);
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred' });
    console.log(error);
    return;
  }
};

export const getApplicationByVendorId = async (req: userRequest, res: Response) => {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: { userId: req.user?.id },
      include: {
        applications: {
          select: {
            title: true,
            vendorId: true,
            applicationId: true,
            description: true,
            location: true,
            status: true,
            permission: {
              select: {
                location: true,
                fee: true,
                validUntil: true,
                permissionId: true,
              },
            },
            createdAt: true,
            images: {
              select: {
                imageUrl: true,
              },
            },
          },
        },
      },
    });
    console.log(vendor);

    console.log(vendor);
    const applications: Array<any> = vendor?.applications ?? []; ////cjahjklashdlkgfjhawsldkg ksdjklgjsakgas
    res.status(200).json(applications);
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: 'Internal server error' });
  }
};

export const updateApplicationStatus = async (req: userRequest, res: Response) => {
  const body = req.body;
  console.log(req.body);
  const validationResult = updateApplicationStatusSchema.safeParse(body);
  if (!validateInput(validationResult)) {
    res.status(404).json({ message: 'Input Validation Failed ' });
    return;
  }
  const applicationId = req.body.applicationId;
  if (!(req.user?.role == 'admin')) {
    res.status(403).json({ message: 'You are not authorized to access this page' });
    return;
  }

  try {
    const application = await prisma.application.update({
      where: { applicationId },
      data: { status: req.body.status },
    });
    if (body.status === 'approved') {
      const permission = await prisma.permission.create({
        data: {
          applicationId: applicationId,
          location: body.permission.location,
          fee: body.permission.fee,
          validUntil: body.permission.validUntil,
        },
      });

      res.status(200).json(permission);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occured' });
    return;
  }
};

export const getFilteredApplications = async (req: userRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access Denied ' });
    return;
  }

  try {
    if (req.body.status == 'approved') {
      const approvedApplications = await prisma.application.findMany({ where: { status: 'approved' } });
      res.status(200).json(approvedApplications);
    } else if (req.body.status == 'pending') {
      const pendingApplications = await prisma.application.findMany({ where: { status: 'pending' } });
      res.status(200).json(pendingApplications);
      return;
    } else if (req.body.status == 'rejected') {
      const rejectedApplications = await prisma.application.findMany({ where: { status: 'rejected' } });
      res.status(200).json(rejectedApplications);
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Some error occured' });
  }
};
