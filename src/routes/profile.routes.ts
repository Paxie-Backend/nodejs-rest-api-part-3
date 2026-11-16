import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/", verifyToken, getProfile);

export default router;
