import { Router } from "express";
import { testController } from "../controllers/test";
import { asyncHandler } from "../middlewares/asyncHandler";
const router = Router();

router.get("",      asyncHandler(testController.getTest));
//router.patch("/:id",    asyncHandler(usersController.patchUser));
//router.put("",      asyncHandler(usersController.putUser));
//router.delete("/:id",   asyncHandler(usersController.deleteUser));

export default router;