import express from "express";
const router = express.Router();

import { UserController } from "../controllers/Users/user.controller.js";
import authVerifyMiddleware from "../middlewares/authverify.middleware.js";

import BrandsController from "../controllers/Brands/brands.controller.js";
import CategoriesController from "../controllers/Categories/categories.controller.js";
import CustomersController from "../controllers/Customers/customer.controller.js";
import SuppliersController from "../controllers/Suppliers/supplier.controller.js";
import ExpenseController from "../controllers/Expenses/expense.controller.js";

// User
router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.post("/verify-email/:email", UserController.verifyEmail);
router.post("/verify-otp/:email/:otp", UserController.verifyOtp);
router.post("/reset", UserController.reset);
router.get("/details", authVerifyMiddleware, UserController.details);
router.put("/update", authVerifyMiddleware, UserController.update);

// Brand
router.post("/brand/create", authVerifyMiddleware, BrandsController.createBrand);
router.put("/brand/update/:id", authVerifyMiddleware, BrandsController.updateBrand);
router.get("/brand/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, BrandsController.listBrand);
router.get("/brand/dropdown", authVerifyMiddleware, BrandsController.dropdownBrand);

// Category
router.post("/category/create", authVerifyMiddleware, CategoriesController.createCategory);
router.put("/category/update/:id", authVerifyMiddleware, CategoriesController.updateCategory);
router.get("/category/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, CategoriesController.listCategories);
router.get("/category/dropdown", authVerifyMiddleware, CategoriesController.dropdownCategories);

// Customer
router.post("/customer/create", authVerifyMiddleware, CustomersController.createCustomer);
router.put("/customer/update/:id", authVerifyMiddleware, CustomersController.updateCustomer);
router.get("/customer/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, CustomersController.listCustomers);
router.get("/customer/dropdown", authVerifyMiddleware, CustomersController.dropdownCustomers);

// Supplier
router.post("/supplier/create", authVerifyMiddleware, SuppliersController.createSupplier);
router.put("/supplier/update/:id", authVerifyMiddleware, SuppliersController.updateSupplier);
router.get("/supplier/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, SuppliersController.listSuppliers);
router.get("/supplier/dropdown", authVerifyMiddleware, SuppliersController.dropdownSuppliers);

// Expense
router.post("/expense/create", authVerifyMiddleware, ExpenseController.createExpense);
router.put("/expense/update/:id", authVerifyMiddleware, ExpenseController.updateExpense);
router.get("/expense/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenseController.expenseList);

export default router;
