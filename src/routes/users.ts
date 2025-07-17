import { Router } from "express";
import { usersController } from "../controllers/users";
import { asyncHandler } from "../middlewares/asyncHandler";
const router = Router();

router.get("",      asyncHandler(usersController.getUsers));

export default router;