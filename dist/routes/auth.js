"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const router = (0, express_1.Router)();
router.post("/login", (0, asyncHandler_1.asyncHandler)(auth_1.authController.postLogin));
router.post("/logout", (0, asyncHandler_1.asyncHandler)(auth_1.authController.postLogout));
exports.default = router;
