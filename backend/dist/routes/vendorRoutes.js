"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendorController_1 = require("../controllers/vendorController");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const router = express_1.default.Router();
router.get('/', middleware_1.authMiddleWare, vendorController_1.getAllVendors); //ADMIN
router.get('/details/:vendorId', middleware_1.authMiddleWare, vendorController_1.getVendorDetails);
router.put('/', middleware_1.authMiddleWare, vendorController_1.updateVendorDetails);
exports.default = router;
//cm52tz7wt0000w7akalv9bhxg
