"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.adminSignupSchema = exports.vendorSignUpSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema using `z.object`
exports.vendorSignUpSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: 'Too long' })
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(20, { message: 'Too long' })
        .optional(),
    email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .max(50, { message: 'Too long' })
        .nonempty(),
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
        address: zod_1.z
            .string()
            .min(5, { message: 'Address is too short' })
            .max(100, { message: 'Too long' })
            .nonempty(),
    }),
});
exports.adminSignupSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: 'Too long' })
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(20, { message: 'Too long' })
        .optional(),
    email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .max(50, { message: 'Too long' })
        .nonempty(),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(50, { message: 'Too long' })
        .nonempty(),
    role: zod_1.z.enum(['vendor', 'admin']),
    AdminKey: zod_1.z.string().max(20, { message: 'Too long' }).nonempty(),
    admin: zod_1.z.object({
        designation: zod_1.z
            .string()
            .min(5, { message: ' too short' })
            .nonempty()
            .max(100, { message: 'Too long' }),
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(3, { message: 'Email too short' })
        .max(30, { message: 'Too long' })
        .nonempty(),
    password: zod_1.z
        .string()
        .min(3, { message: ' too short' })
        .max(30, { message: 'Too long' })
        .nonempty(),
    role: zod_1.z.enum(['admin', 'vendor']),
});
