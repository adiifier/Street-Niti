"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stallController_1 = require("../controllers/stallController");
const router = express_1.default.Router();
router.post('/', stallController_1.createStall);
router.get('/', stallController_1.getAllStalls); //Admin
router.post('/vendor', stallController_1.getAllStallsByVendorId);
// router.get("/:id",getStallDeatils)
exports.default = router;
