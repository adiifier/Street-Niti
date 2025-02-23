"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const middleware_1 = require("../middlewares/middleware");
const router = express_1.default.Router();
router.post('/', middleware_1.authMiddleWare, applicationController_1.createNewApplication);
router.get('/admin', middleware_1.authMiddleWare, applicationController_1.getAllApplications); // ADMIN
router.post('/vendor', middleware_1.authMiddleWare, applicationController_1.getApplicationById);
router.get('/vendor', middleware_1.authMiddleWare, applicationController_1.getApplicationByVendorId);
router.post('/admin/status', middleware_1.authMiddleWare, applicationController_1.updateApplicationStatus);
router.get('/admin/:status', middleware_1.authMiddleWare, applicationController_1.getFilteredApplications);
exports.default = router;
