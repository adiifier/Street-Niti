import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  adminSignupSchema,
  adminSignUpType,
  loginSchema,
  loginType,
  vendorSignUpSchema,
  vendorSignUpType,
} from '../types/types';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
function validateInput(validationResult: any) {
  if (!validationResult.success) {
    console.log(' Zod Validation Error', validationResult.error.errors);
    return false;
  }
  return true;
}

if (!JWT_SECRET) {
  throw new Error('JWT secret is not defined');
}
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const extinguisher = await prisma.user.findFirst({
      where: { email: body.email },
    });

    // if (!(body.role === 'admin' || body.role === 'vendor')) {
    //   res.status(400).json({ message: 'Role not specified' });
    //   return;
    // }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    //VENDOR USER

    if (body.role === 'vendor') {
      const validationResult = vendorSignUpSchema.safeParse(body);

      if (!validateInput(validationResult)) {
        res.status(404).json({ message: 'Input Validation Failed ' });
        return;
      }
      try {
        const validData: vendorSignUpType = body;
      } catch (error) {
        console.log('Validation Error', error);
      }

      if (extinguisher) {
        res.status(409).json({ message: 'Email already exists' });
        return;
      }

      try {
        const newUser = await prisma.user.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashedPassword,
            role: Role.vendor,
            vendor: {
              create: {
                buisnessName: body.vendor.buisnessName,
                address: body.vendor.address,
              },
            },
          },
        });
        const payload = {
          userId: newUser.id,
          role: newUser.role,
        };
        const token = JWT.sign(payload, JWT_SECRET);
        res.status(200).json({ message: 'User created Successfully', token: token });
      } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'Error while creating vendor ' });
        return;
      }
    }

    //ADMIN USER

    const checkAdminKey = (): boolean => {
      if (body.AdminKey != process.env.ADMIN_SECURITY_KEY) {
        res.status(404).json({ message: 'Wrong Admin Key , Access Denied' });
        return false;
      }
      return true;
    };

    if (body.role === 'admin') {
      const validationResult = adminSignupSchema.safeParse(body);
      if (!validateInput(validationResult)) {
        res.status(404).json({ message: 'Input Validation Failed ' });
        return;
      }

      try {
        const validData: adminSignUpType = body;
      } catch (error) {
        console.log('Validation Error', error);
      }

      if (extinguisher) {
        res.status(409).json({ message: 'Email already exists' });
        return;
      }

      if (!checkAdminKey()) return;

      try {
        const newUserAdmin = await prisma.user.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashedPassword,
            role: Role.admin,
            admin: {
              create: {
                designation: body.admin.designation,
              },
            },
          },
        });

        const payload = {
          userId: newUserAdmin.id,
          role: newUserAdmin.role,
        };

        const token = await JWT.sign(payload, JWT_SECRET);
        res.status(200).json({
          message: 'Admin Created Successfully',
          token: token,
        });

        return;
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error while creating Admin' });
        return;
      }
    }
  } catch (error) {
    console.log('Unexpected error occured :' + error);
    res.status(500).json({ message: 'Unexpected Error occured' });
    return;
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const validationResult = loginSchema.safeParse(body);
    if (!validateInput(validationResult)) {
      res.status(404).json({ message: 'Input Validation Failed ' });
      return;
    }
    try {
      const validData: loginType = body;
    } catch (error) {
      console.log('Validation Error', error);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    const payload = {
      userId: user?.id,
      role: user?.role,
    };
    if (!user) {
      res.status(403).json({ message: 'No User Found' });
      return;
    }

    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      res.status(403).json({ message: 'Wrong password' });
      return;
    }

    const token = await JWT.sign(payload, JWT_SECRET);
    res.status(200).json({ message: 'Login Succesfull', token: token });
  } catch (error) {
    console.log(error);
  }
};
