import express from "express";
const router = express.Router();

import { UserController } from "../controllers/Users/user.controller.js";
import authVerifyMiddleware from "../middlewares/authverify.middleware.js";

// User routes
router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.post("/verify-email", UserController.verifyEmail);
router.post("/verify-otp", UserController.verifyOtp);
router.post("/reset", UserController.reset);

router.get("/details", authVerifyMiddleware, UserController.details);
router.put("/update", authVerifyMiddleware, UserController.update);

export default router;
