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
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Jwt Error');
}
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const prisma = new client_1.PrismaClient();
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(403).json('Token Not Present');
            return;
        }
        const verify = (yield jsonwebtoken_1.default.verify(token, JWT_SECRET));
        if (!verify) {
            res.status(403).json({ message: 'User not Authorized' });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: verify.userId,
                role: verify.role,
            },
            include: {
                vendor: {
                    select: {
                        vendorId: true,
                    },
                },
                admin: true,
            },
        });
        if (!user) {
            res.status(400).json({ message: 'Not Authorized' });
            return;
        }
        if (verify.role === (user === null || user === void 0 ? void 0 : user.role) && verify.userId) {
            req.user = user;
            next();
        }
        else {
            res.status(403).json({ message: 'Access Denied' });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: 'User Not Authorized' });
        return;
    }
});
exports.authMiddleWare = authMiddleWare;
