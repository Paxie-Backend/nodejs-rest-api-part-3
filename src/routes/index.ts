import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import profileRouter from "./profile.routes.js";
import postRouter from "./post.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/posts", postRouter);

export default router;
