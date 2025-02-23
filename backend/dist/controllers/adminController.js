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
exports.getVendorDetails = exports.getAllAdmins = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//GET ALL ADMINS (SUPERADMINROUTE)
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'superAdmin') {
            res.status(403).json({ message: 'You are not authorized to access this ' });
            return;
        }
        const admins = yield prisma.user.findMany({
            where: {
                role: 'admin',
            },
            include: {
                admin: true,
            },
        });
        res.status(200).json(admins);
        return;
    }
    catch (error) {
        console.log('Error in Get all SuperAdmin route' + error);
        res.status(500).json('Some error occured');
        return;
    }
});
exports.getAllAdmins = getAllAdmins;
//GET ADMIN DETAILS ROUTE
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
