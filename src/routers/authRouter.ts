import { Router } from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../controllers/authController";
import checkAuthentication from "../middleware/checkAuthentication";

const router = Router();

router.route("/register").post(registerUser);
router.route("/currentUser").get(checkAuthentication, getCurrentUser);
router.route("/login").post(loginUser);

export default router;
