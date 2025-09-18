import express from "express";
const router = express.Router();

import { UserController } from "../controllers/Users/user.controller.js";
import authVerifyMiddleware from "../middlewares/authverify.middleware.js";
import BrandsController from "../controllers/Brands/brands.controller.js";

router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.post("/verify-email/:email", UserController.verifyEmail);
router.post("/verify-otp/:email/:otp", UserController.verifyOtp);
router.post("/reset", UserController.reset);

router.get("/details", authVerifyMiddleware, UserController.details);
router.put("/update", authVerifyMiddleware, UserController.update);

router.post("/brand/create", BrandsController.createBrand);
router.put("/brand/update/:id", BrandsController.updateBrand);
router.get("/brand/list/:pageNo/:perPage/:searchKeyword", BrandsController.listBrand);
router.get("/brand/dropdown", BrandsController.dropdownBrand);

export default router;
