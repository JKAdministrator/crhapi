import { Router } from "express";
import { authController } from "../controllers/auth";
import { asyncHandler } from "../middlewares/asyncHandler";
const router = Router();

router.post("/login", asyncHandler(authController.postLogin));
router.post("/logout", asyncHandler(authController.postLogout));

export default router;