"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorUpdateSchema = void 0;
const zod_1 = require("zod");
exports.vendorUpdateSchema = zod_1.z.object({
    buisnessName: zod_1.z
        .string()
        .min(1, { message: 'Business name is required' })
        .max(100, { message: 'Business name is too long' })
        .optional(),
    vendor: zod_1.z.object({}).optional(),
    address: zod_1.z
        .string()
        .min(1, { message: 'Address is required' })
        .max(255, { message: 'Address is too long' })
        .optional(),
    password: zod_1.z
        .string()
        .min(1, { message: 'Address is required' })
        .max(255, { message: 'Address is too long' })
        .optional(),
    firstName: zod_1.z
        .string()
        .min(1, { message: 'Address is required' })
        .max(255, { message: 'Address is too long' })
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Address is required' })
        .max(255, { message: 'Address is too long' })
        .optional(),
    role: zod_1.z
        .string()
        .optional()
        .refine((val) => val === undefined, {
        message: 'Password field is prohibited',
    }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }).optional(),
});
