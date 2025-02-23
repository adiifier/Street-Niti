"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorDetails = exports.getVendorDetails = exports.getAllVendors = void 0;
const client_1 = require("@prisma/client");
const types_1 = require("../types/types");
const prisma = new client_1.PrismaClient();
//ZOD Validation Function
function validateInput(validationResult) {
    if (!validationResult.success) {
        console.log(' Zod Validation Error', validationResult.error.errors);
        return false;
    }
    return true;
}
//GET ALL VENDORS ROUTE
const getAllVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
            res.status(403).json({ message: 'You are not authorized to access this ' });
            return;
        }
        const vendor = yield prisma.user.findMany({
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
    }
    catch (error) {
        console.log('Error in Get all vendors route' + error);
        res.status(500).json('Some error occured');
        return;
    }
});
exports.getAllVendors = getAllVendors;
//GET VENDOR BY ID ROUTE
const getVendorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = req.params.vendorId;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'vendor' || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== userId) {
            res.status(403).json({ message: 'You are not authorized to access this vendor' });
            return;
        }
        const vendorDetails = yield prisma.user.findMany({
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
    }
    catch (error) {
        console.log('Error in Get vendor details route' + error);
        res.status(500).json({ message: 'Some error occured' });
        return;
    }
});
exports.getVendorDetails = getVendorDetails;
//UPDATE VENDOR DETAILS
const updateVendorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const body = req.body;
        const validationResult = types_1.updateVendorDetailsSchema.safeParse(body);
        if (!validateInput(validationResult)) {
            res.status(404).json({ message: 'Input Validation Failed ' });
            return;
        }
        const updateData = validationResult.data;
        const updatePayload = {};
        if (updateData.firstName)
            updatePayload.firstName = updateData.firstName;
        if (updateData.lastName)
            updatePayload.lastName = updateData.lastName;
        if (updateData.email)
            updatePayload.email = updateData.email;
        if (updateData.vendor) {
            // Initialize vendor object in updatePayload
            updatePayload.vendor = {
                buisnessName: (_a = updateData.vendor.buisnessName) !== null && _a !== void 0 ? _a : undefined,
                address: (_b = updateData.vendor.address) !== null && _b !== void 0 ? _b : undefined,
            };
        }
        if (updateData.email) {
            const checkEmail = yield prisma.user.findFirst({
                where: { email: updateData.email },
            });
            if (checkEmail) {
                res.status(403).json({ message: 'Email Already used' });
                return;
            }
        }
        try {
            const updateVendor = yield prisma.user.update({
                where: {
                    id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
                },
                data: Object.assign(Object.assign({}, updatePayload), { vendor: {
                        update: {
                            buisnessName: ((_d = updatePayload.vendor) === null || _d === void 0 ? void 0 : _d.buisnessName) || undefined,
                            address: ((_e = updatePayload.vendor) === null || _e === void 0 ? void 0 : _e.address) || undefined,
                        },
                    } }),
            });
            if (updateVendor) {
                res.status(200).json({
                    message: 'Details updates succesfully',
                    details: updateVendor,
                });
                return;
            }
        }
        catch (error) {
            console.log('Error in Update Vendor Details Route' + error),
                res.status(500).json({ message: 'Some error ocurred' });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.updateVendorDetails = updateVendorDetails;
