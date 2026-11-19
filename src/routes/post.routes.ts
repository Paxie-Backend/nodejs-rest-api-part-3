import { Router } from "express";
import { index, showBySlug } from "../controllers/post.controller.js";
// import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", index);
router.get("/:slug", showBySlug);

export default router;
