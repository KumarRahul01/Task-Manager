import { handleGetUserProfile, handleUserLogin, handleUserSignup } from "../controllers/user.controller.js";
import { Router } from "express";
import { validateAccessToken } from "../middleware/auth.js";

const router = Router();


router.route("/signup").post(handleUserSignup);
router.route("/login").post(handleUserLogin);

router.use(validateAccessToken);
router.route("/profile").get(handleGetUserProfile);

export default router;