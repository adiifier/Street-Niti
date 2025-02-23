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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStallDetails = exports.getAllStallsByVendorId = exports.getAllStalls = exports.createStall = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("../types/types");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
function validateInput(validationResult) {
    if (!validationResult.success) {
        console.log(' Zod Validation Error', validationResult.error.errors);
        return false;
    }
    return true;
}
const createStall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validationResult = types_1.createStallSchema.safeParse(req.body);
    if (!validateInput(validationResult)) {
        res.status(404).json({ message: 'Input Validation Failed' });
        return;
    }
    try {
        const vendor = yield prisma.vendor.findFirst({ where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!vendor) {
            res.status(403).json({ message: 'Vendor Not Found' });
            return;
        }
        const stall = yield prisma.stall.create({
            data: {
                name: req.body.name,
                location: req.body.location,
                vendorId: vendor.vendorId,
                size: req.body.size,
            },
        });
        res.status(200).json({ message: 'Stall created successfully', stall: stall });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occurred' });
        return;
    }
});
exports.createStall = createStall;
const getAllStalls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stalls = yield prisma.stall.findMany({});
        res.status(200).json(stalls);
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occurred' });
        return;
    }
});
exports.getAllStalls = getAllStalls;
const getAllStallsByVendorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stalls = yield prisma.stall.findMany({ where: { vendorId: req.body.vendorId } });
        res.status(200).json(stalls);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occurred' });
        return;
    }
});
exports.getAllStallsByVendorId = getAllStallsByVendorId;
const getStallDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stall = yield prisma.stall.findFirst({ where: { stallId: req.body.stallId } });
        res.status(200).json(stall);
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occurred' });
        return;
    }
});
exports.getStallDetails = getStallDetails;
