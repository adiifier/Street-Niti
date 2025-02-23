import { z } from 'zod';

// Define the Zod schema using `z.object`
export const vendorSignUpSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).max(20, { message: 'Too long' }).optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).max(20, { message: 'Too long' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).max(50, { message: 'Too long' }).nonempty(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Too long' })
    .nonempty(),
  role: z.enum(['vendor', 'admin']),
  vendor: z.object({
    buisnessName: z
      .string()
      .min(5, { message: 'Business name is too short' })
      .max(100, { message: 'Too long' })
      .nonempty(),
    address: z.string().min(5, { message: 'Address is too short' }).max(100, { message: 'Too long' }).nonempty(),
  }),
});
export const adminSignupSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).max(20, { message: 'Too long' }).optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).max(20, { message: 'Too long' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).max(50, { message: 'Too long' }).nonempty(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Too long' })
    .nonempty(),
  role: z.enum(['vendor', 'admin']),
  AdminKey: z.string().max(20, { message: 'Too long' }).nonempty(),
  admin: z.object({
    designation: z.string().min(5, { message: ' too short' }).nonempty().max(100, { message: 'Too long' }),
  }),
});

export const loginSchema = z.object({
  email: z.string().min(3, { message: 'Email too short' }).max(30, { message: 'Too long' }).nonempty(),
  password: z.string().min(3, { message: ' too short' }).max(30, { message: 'Too long' }).nonempty(),
  role: z.enum(['admin', 'vendor']),
});

export const updateVendorDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name must not be empty')
    .max(50, 'First name must not exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name must not be empty')
    .max(50, 'Last name must not exceed 50 characters')
    .optional(),
  email: z.string().email('Invalid email address').max(100, 'Email must not exceed 100 characters').optional(),
  vendor: z
    .object({
      buisnessName: z
        .string()
        .min(1, 'Business name must not be empty')
        .max(100, 'Business name must not exceed 100 characters')
        .optional(),
      address: z
        .string()
        .min(1, 'Address must not be empty')
        .max(200, 'Address must not exceed 200 characters')
        .optional(),
    })
    .optional(),
});

export const createApplicationSchema = z.object({
  title: z.string().min(1, { message: 'Title Not Present' }).max(300, { message: 'Title too long' }),

  description: z.string().min(1, { message: 'Description Too Short' }).max(4000, { message: 'Description too long' }),

  location: z.string().min(1, { message: 'Location Not Present' }).max(300, { message: 'Location too long' }),

  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Optional field, so allow empty
        return file.size <= 5 * 1024 * 1024; // 5MB limit
      },
      { message: 'File should be under 5MB' }
    ),
});

export const updateApplicationStatusSchema = z.object({
  applicationId: z.string().max(1000),
  status: z.enum(['pending', 'approved', 'rejected']),
  permission: z
    .object({
      location: z.string().max(1000),
      fee: z.number().max(100000),
      validUntil: z.string(),
    })
    .optional(),
});

export const createStallSchema = z.object({
  name: z.string().max(100),
  location: z.string().max(500),
  size: z.string().max(100),
});

// export const createApplicationSchema = z.object({
//   title: z.string().min(1, { message: 'Title Not Present' }).max(300, { message: 'Title too long' }),
//   description: z.string().min(1, { message: 'Description Too Short' }).max(4000, { message: 'Description too long' }),
//   location: z.string().min(1, { message: 'Location Not Present' }).max(300, { message: 'Location too long' }),
//   image: z
//     .instanceof(File)
//     .optional()
//     .refine((file) => {
//       if (!file) return false;
//       file?.size <= 5 * 1024, { message: 'File should be under 5MB' };
//     }),
// });

// Infer the type
export type vendorSignUpType = z.infer<typeof vendorSignUpSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type adminSignUpType = z.infer<typeof adminSignupSchema>;
export type updateVendorDetailsType = z.infer<typeof updateVendorDetailsSchema>;
export type createApplicationType = z.infer<typeof createApplicationSchema>;
export type updateApplicationStatusType = z.infer<typeof updateApplicationStatusSchema>;
export type createStallType = z.infer<typeof createStallSchema>;
