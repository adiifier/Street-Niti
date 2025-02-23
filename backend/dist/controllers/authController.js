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
exports.signInUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("../types/types");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
function validateInput(validationResult) {
    if (!validationResult.success) {
        console.log(' Zod Validation Error', validationResult.error.errors);
        return false;
    }
    return true;
}
if (!JWT_SECRET) {
    throw new Error('JWT secret is not defined');
}
const prisma = new client_1.PrismaClient();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const extinguisher = yield prisma.user.findFirst({
            where: { email: body.email },
        });
        // if (!(body.role === 'admin' || body.role === 'vendor')) {
        //   res.status(400).json({ message: 'Role not specified' });
        //   return;
        // }
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        //VENDOR USER
        if (body.role === 'vendor') {
            const validationResult = types_1.vendorSignUpSchema.safeParse(body);
            if (!validateInput(validationResult)) {
                res.status(404).json({ message: 'Input Validation Failed ' });
                return;
            }
            try {
                const validData = body;
            }
            catch (error) {
                console.log('Validation Error', error);
            }
            if (extinguisher) {
                res.status(409).json({ message: 'Email already exists' });
                return;
            }
            try {
                const newUser = yield prisma.user.create({
                    data: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: hashedPassword,
                        role: client_1.Role.vendor,
                        vendor: {
                            create: {
                                buisnessName: body.vendor.buisnessName,
                                address: body.vendor.address,
                            },
                        },
                    },
                });
                const payload = {
                    userId: newUser.id,
                    role: newUser.role,
                };
                const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET);
                res.status(200).json({ message: 'User created Successfully', token: token });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error while creating vendor ' });
                return;
            }
        }
        //ADMIN USER
        const checkAdminKey = () => {
            if (body.AdminKey != process.env.ADMIN_SECURITY_KEY) {
                res.status(404).json({ message: 'Wrong Admin Key , Access Denied' });
                return false;
            }
            return true;
        };
        if (body.role === 'admin') {
            const validationResult = types_1.adminSignupSchema.safeParse(body);
            if (!validateInput(validationResult)) {
                res.status(404).json({ message: 'Input Validation Failed ' });
                return;
            }
            try {
                const validData = body;
            }
            catch (error) {
                console.log('Validation Error', error);
            }
            if (extinguisher) {
                res.status(409).json({ message: 'Email already exists' });
                return;
            }
            if (!checkAdminKey())
                return;
            try {
                const newUserAdmin = yield prisma.user.create({
                    data: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: hashedPassword,
                        role: client_1.Role.admin,
                        admin: {
                            create: {
                                designation: body.admin.designation,
                            },
                        },
                    },
                });
                const payload = {
                    userId: newUserAdmin.id,
                    role: newUserAdmin.role,
                };
                const token = yield jsonwebtoken_1.default.sign(payload, JWT_SECRET);
                res.status(200).json({
                    message: 'Admin Created Successfully',
                    token: token,
                });
                return;
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error while creating Admin' });
                return;
            }
        }
    }
    catch (error) {
        console.log('Unexpected error occured :' + error);
        res.status(500).json({ message: 'Unexpected Error occured' });
        return;
    }
});
exports.registerUser = registerUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const validationResult = types_1.loginSchema.safeParse(body);
        if (!validateInput(validationResult)) {
            res.status(404).json({ message: 'Input Validation Failed ' });
            return;
        }
        try {
            const validData = body;
        }
        catch (error) {
            console.log('Validation Error', error);
        }
        const user = yield prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        const payload = {
            userId: user === null || user === void 0 ? void 0 : user.id,
            role: user === null || user === void 0 ? void 0 : user.role,
        };
        if (!user) {
            res.status(403).json({ message: 'No User Found' });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(body.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: 'Wrong password' });
            return;
        }
        const token = yield jsonwebtoken_1.default.sign(payload, JWT_SECRET);
        res.status(200).json({ message: 'Login Succesfull', token: token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signInUser = signInUser;
