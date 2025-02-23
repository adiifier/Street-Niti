import { z } from 'zod';

export const vendorUpdateSchema = z.object({
  buisnessName: z
    .string()
    .min(1, { message: 'Business name is required' })
    .max(100, { message: 'Business name is too long' })
    .optional(),
  vendor: z.object({}).optional(),

  address: z
    .string()
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address is too long' })
    .optional(),

  password: z
    .string()
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address is too long' })
    .optional(),
  firstName: z
    .string()
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address is too long' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address is too long' })
    .optional(),
  role: z
    .string()
    .optional()
    .refine((val) => val === undefined, {
      message: 'Password field is prohibited',
    }),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
});

export type vendorUpdateType = z.infer<typeof vendorUpdateSchema>;
