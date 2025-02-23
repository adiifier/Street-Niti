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
exports.getFilteredApplications = exports.updateApplicationStatus = exports.getApplicationByVendorId = exports.getApplicationById = exports.getAllApplications = exports.createNewApplication = void 0;
const client_1 = require("@prisma/client");
const supabase_js_1 = require("@supabase/supabase-js");
const uuid_1 = require("uuid");
const types_1 = require("../types/types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//ADDING SUPABASE INITIALIZATION
if (!process.env.SUPABASE_BUCKET_URL) {
    throw new Error(' Supabase Bucket Url  is not defined');
}
if (!process.env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase Anon Key is not defined');
}
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_BUCKET_URL, process.env.SUPABASE_ANON_KEY);
const prisma = new client_1.PrismaClient();
function validateInput(validationResult) {
    if (!validationResult.success) {
        console.log(' Zod Validation Error', validationResult.error.errors);
        return false;
    }
    return true;
}
const createNewApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    if (req.files) {
        const image = req.files.image;
        let publicUrl;
        const files = Array.isArray(image) ? image : [image];
        try {
            for (const file of files) {
                const uniqueFileName = `${(0, uuid_1.v4)()}-${file.name}`;
                const { data, error } = yield supabase.storage
                    .from('Project')
                    .upload(`${uniqueFileName}`, file.data, { cacheControl: '3600' });
                if (error) {
                    throw new Error('Error Uploading the image');
                }
                publicUrl = yield supabase.storage.from('Project').getPublicUrl(`${uniqueFileName}`).data.publicUrl;
                console.log(publicUrl);
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Some error occurred while uploading image');
            return;
        }
        const vendor = yield prisma.vendor.findUnique({ where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        const vendorId = vendor === null || vendor === void 0 ? void 0 : vendor.vendorId;
        try {
            const application = yield prisma.application.create({
                data: {
                    vendor: {
                        connect: {
                            vendorId: vendorId,
                        },
                    },
                    title: req.body.title,
                    description: req.body.description,
                    location: req.body.location,
                    images: {
                        create: {
                            imageUrl: publicUrl,
                        },
                    },
                },
            });
            res.status(200).json({ message: 'Application created Succesfully' });
            return;
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Some error occured in the server' });
        }
    }
    const validationResult = types_1.createApplicationSchema.safeParse(body);
    if (!validateInput(validationResult)) {
        res.status(403).json({ message: 'Input Validation Failed' });
        return;
    }
    try {
        const vendor = yield prisma.vendor.findUnique({
            where: {
                userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
            },
        });
        if (!vendor) {
            res.status(403).json({ message: 'Vendor Not Found' });
            return;
        }
        const appllication = yield prisma.application.create({
            data: {
                vendorId: vendor.vendorId,
                title: body.title,
                description: body.description,
                location: body.location,
            },
        });
        if (appllication) {
            res.status(200).json({ message: 'Application Created Succesfully' });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some error occurred' });
        return;
    }
});
exports.createNewApplication = createNewApplication;
const getAllApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.user.findUnique({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
            res.status(403).json({ message: 'You are not authorized to access this page' });
            return;
        }
        const applications = yield prisma.application.findMany({ include: { images: { select: { imageUrl: true } } } });
        if (applications) {
            res.status(200).json(applications);
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error occured' });
        return;
    }
});
exports.getAllApplications = getAllApplications;
const getApplicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const application = (_a = (yield prisma.application.findFirst({ where: { applicationId: body.id } }))) !== null && _a !== void 0 ? _a : {};
        if (application) {
            res.status(200).json(application);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error occurred' });
        console.log(error);
        return;
    }
});
exports.getApplicationById = getApplicationById;
const getApplicationByVendorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const vendor = yield prisma.vendor.findFirst({
            where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
            include: {
                applications: {
                    select: {
                        title: true,
                        vendorId: true,
                        applicationId: true,
                        description: true,
                        location: true,
                        status: true,
                        permission: {
                            select: {
                                location: true,
                                fee: true,
                                validUntil: true,
                                permissionId: true,
                            },
                        },
                        createdAt: true,
                        images: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
        console.log(vendor);
        console.log(vendor);
        const applications = (_b = vendor === null || vendor === void 0 ? void 0 : vendor.applications) !== null && _b !== void 0 ? _b : []; ////cjahjklashdlkgfjhawsldkg ksdjklgjsakgas
        res.status(200).json(applications);
        return;
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ message: 'Internal server error' });
    }
});
exports.getApplicationByVendorId = getApplicationByVendorId;
const updateApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    console.log(req.body);
    const validationResult = types_1.updateApplicationStatusSchema.safeParse(body);
    if (!validateInput(validationResult)) {
        res.status(404).json({ message: 'Input Validation Failed ' });
        return;
    }
    const applicationId = req.body.applicationId;
    if (!(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) == 'admin')) {
        res.status(403).json({ message: 'You are not authorized to access this page' });
        return;
    }
    try {
        const application = yield prisma.application.update({
            where: { applicationId },
            data: { status: req.body.status },
        });
        if (body.status === 'approved') {
            const permission = yield prisma.permission.create({
                data: {
                    applicationId: applicationId,
                    location: body.permission.location,
                    fee: body.permission.fee,
                    validUntil: body.permission.validUntil,
                },
            });
            res.status(200).json(permission);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occured' });
        return;
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
const getFilteredApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        res.status(403).json({ message: 'Access Denied ' });
        return;
    }
    try {
        if (req.body.status == 'approved') {
            const approvedApplications = yield prisma.application.findMany({ where: { status: 'approved' } });
            res.status(200).json(approvedApplications);
        }
        else if (req.body.status == 'pending') {
            const pendingApplications = yield prisma.application.findMany({ where: { status: 'pending' } });
            res.status(200).json(pendingApplications);
            return;
        }
        else if (req.body.status == 'rejected') {
            const rejectedApplications = yield prisma.application.findMany({ where: { status: 'rejected' } });
            res.status(200).json(rejectedApplications);
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Some error occured' });
    }
});
exports.getFilteredApplications = getFilteredApplications;
