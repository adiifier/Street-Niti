"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStallSchema = exports.updateApplicationStatusSchema = exports.createApplicationSchema = exports.updateVendorDetailsSchema = exports.loginSchema = exports.adminSignupSchema = exports.vendorSignUpSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema using `z.object`
exports.vendorSignUpSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }).max(20, { message: 'Too long' }).optional(),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }).max(20, { message: 'Too long' }).optional(),
    email: zod_1.z.string().email({ message: 'Invalid email address' }).max(50, { message: 'Too long' }).nonempty(),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(100, { message: 'Too long' })
        .nonempty(),
    role: zod_1.z.enum(['vendor', 'admin']),
    vendor: zod_1.z.object({
        buisnessName: zod_1.z
            .string()
            .min(5, { message: 'Business name is too short' })
            .max(100, { message: 'Too long' })
            .nonempty(),
        address: zod_1.z.string().min(5, { message: 'Address is too short' }).max(100, { message: 'Too long' }).nonempty(),
    }),
});
exports.adminSignupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }).max(20, { message: 'Too long' }).optional(),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }).max(20, { message: 'Too long' }).optional(),
    email: zod_1.z.string().email({ message: 'Invalid email address' }).max(50, { message: 'Too long' }).nonempty(),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(50, { message: 'Too long' })
        .nonempty(),
    role: zod_1.z.enum(['vendor', 'admin']),
    AdminKey: zod_1.z.string().max(20, { message: 'Too long' }).nonempty(),
    admin: zod_1.z.object({
        designation: zod_1.z.string().min(5, { message: ' too short' }).nonempty().max(100, { message: 'Too long' }),
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().min(3, { message: 'Email too short' }).max(30, { message: 'Too long' }).nonempty(),
    password: zod_1.z.string().min(3, { message: ' too short' }).max(30, { message: 'Too long' }).nonempty(),
    role: zod_1.z.enum(['admin', 'vendor']),
});
exports.updateVendorDetailsSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, 'First name must not be empty')
        .max(50, 'First name must not exceed 50 characters')
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, 'Last name must not be empty')
        .max(50, 'Last name must not exceed 50 characters')
        .optional(),
    email: zod_1.z.string().email('Invalid email address').max(100, 'Email must not exceed 100 characters').optional(),
    vendor: zod_1.z
        .object({
        buisnessName: zod_1.z
            .string()
            .min(1, 'Business name must not be empty')
            .max(100, 'Business name must not exceed 100 characters')
            .optional(),
        address: zod_1.z
            .string()
            .min(1, 'Address must not be empty')
            .max(200, 'Address must not exceed 200 characters')
            .optional(),
    })
        .optional(),
});
exports.createApplicationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title Not Present' }).max(300, { message: 'Title too long' }),
    description: zod_1.z.string().min(1, { message: 'Description Too Short' }).max(4000, { message: 'Description too long' }),
    location: zod_1.z.string().min(1, { message: 'Location Not Present' }).max(300, { message: 'Location too long' }),
    image: zod_1.z
        .any()
        .optional()
        .refine((file) => {
        if (!file)
            return true; // Optional field, so allow empty
        return file.size <= 5 * 1024 * 1024; // 5MB limit
    }, { message: 'File should be under 5MB' }),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    applicationId: zod_1.z.string().max(1000),
    status: zod_1.z.enum(['pending', 'approved', 'rejected']),
    permission: zod_1.z
        .object({
        location: zod_1.z.string().max(1000),
        fee: zod_1.z.number().max(100000000),
        validUntil: zod_1.z.string(),
    })
        .optional(),
});
exports.createStallSchema = zod_1.z.object({
    name: zod_1.z.string().max(100),
    location: zod_1.z.string().max(500),
    size: zod_1.z.string().max(100),
});
