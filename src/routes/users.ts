import { Router } from "express";
import { usersController } from "../controllers/users";
import { asyncHandler } from "../middlewares/asyncHandler";
const router = Router();

router.get("",      asyncHandler(usersController.getUser));
router.patch("",    asyncHandler(usersController.patchUser));
router.put("",      asyncHandler(usersController.putUser));
router.delete("",   asyncHandler(usersController.deleteUser));

export default router;