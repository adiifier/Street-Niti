import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import { PrismaClient, Role, User } from '@prisma/client';
import { set } from 'zod';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Jwt Error');
}

export interface userRequest extends Request {
  user?: User;
}
export const authMiddleWare = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    const prisma = new PrismaClient();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(403).json('Token Not Present');
      return;
    }

    const verify = (await JWT.verify(token, JWT_SECRET)) as {
      userId: string;
      role: Role;
    };

    if (!verify) {
      res.status(403).json({ message: 'User not Authorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: verify.userId,
        role: verify.role,
      },
      include: {
        vendor: {
          select: {
            vendorId: true,
          },
        },
        admin: true,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Not Authorized' });
      return;
    }

    if (verify.role === user?.role && verify.userId) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Access Denied' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'User Not Authorized' });
    return;
  }
};
