import express from "express"; 
const router = express.Router();

import UserController from "../controllers/Users/user.controller.js";
import authVerifyMiddleware from "../middlewares/authverify.middleware.js";

import BrandsController from "../controllers/Brands/brands.controller.js";
import CategoriesController from "../controllers/Categories/categories.controller.js";
import CustomersController from "../controllers/Customers/customer.controller.js";
import SuppliersController from "../controllers/Suppliers/supplier.controller.js";
import ExpenseController from "../controllers/Expenses/expense.controller.js";
import ProductController from "../controllers/Products/product.controller.js";

import PurchaseController from "../controllers/Purchase/purchase.controller.js";
import SalesController from "../controllers/Sales/sales.controller.js";
import ReturnController from "../controllers/Return/return.controller.js";

// ===== Import Summary Controllers =====
import expenseSummaryService from "../services/summary/expensesummary.service.js";
import purchaseSalesSummaryService from "../services/summary/purchasesummary.service.js";
import salesSummaryService from "../services/summary/salessummary.service.js";
import returnSummaryService from "../services/summary/returnsummary.service.js";

// ===== User Routes =====
router.post("/create", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/verify-email/:email", UserController.verifyEmail);
router.post("/verify-otp/:email/:otp", UserController.verifyOtp);
router.post("/reset", UserController.resetUser);
router.get("/details", authVerifyMiddleware, UserController.getUserDetails);
router.put("/update", authVerifyMiddleware, UserController.updateUser);

// ===== Brand Routes =====
router.post("/brand/create", authVerifyMiddleware, BrandsController.createBrand);
router.put("/brand/update/:id", authVerifyMiddleware, BrandsController.updateBrand);
router.get("/brand/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, BrandsController.listBrand);
router.get("/brand/dropdown", authVerifyMiddleware, BrandsController.dropdownBrand);
router.get("/brand/delete/:id", authVerifyMiddleware, BrandsController.deleteBrand);
router.get("/brand/details/:id", authVerifyMiddleware, BrandsController.brandDetails);

// ===== Category Routes =====
router.post("/category/create", authVerifyMiddleware, CategoriesController.createCategory);
router.put("/category/update/:id", authVerifyMiddleware, CategoriesController.updateCategory);
router.get("/category/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, CategoriesController.listCategories);
router.get("/category/dropdown", authVerifyMiddleware, CategoriesController.dropdownCategories);
router.get("/category/delete/:id", authVerifyMiddleware, CategoriesController.deleteCategory);

// ===== Customer Routes =====
router.post("/customer/create", authVerifyMiddleware, CustomersController.createCustomer);
router.put("/customer/update/:id", authVerifyMiddleware, CustomersController.updateCustomer);
router.get("/customer/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, CustomersController.listCustomers);
router.get("/customer/dropdown", authVerifyMiddleware, CustomersController.dropdownCustomers);
router.get("/customer/delete/:id", authVerifyMiddleware, CustomersController.deleteCustomer); 

// ===== Supplier Routes =====
router.post("/supplier/create", authVerifyMiddleware, SuppliersController.createSupplier);
router.put("/supplier/update/:id", authVerifyMiddleware, SuppliersController.updateSupplier);
router.get("/supplier/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, SuppliersController.listSuppliers);
router.get("/supplier/dropdown", authVerifyMiddleware, SuppliersController.dropdownSuppliers);
router.get("/supplier/delete/:id", authVerifyMiddleware, SuppliersController.deleteSupplier); 

// ===== Expense Routes =====
router.post("/expense/create", authVerifyMiddleware, ExpenseController.createExpense);
router.put("/expense/update/:id", authVerifyMiddleware, ExpenseController.updateExpense);
router.get("/expense/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenseController.expenseList);
router.get("/expense/delete/:id", authVerifyMiddleware, ExpenseController.deleteExpense);  

// ===== Expense Summary Route =====
router.get("/expense/summary", authVerifyMiddleware, async (req, res) => {
    try {
        const summary = await expenseSummaryService(req);
        return res.json(summary);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ===== Purchase/Sales Summary Route =====
router.get("/purchase-sales/summary", authVerifyMiddleware, async (req, res) => {
    try {
        const summary = await purchaseSalesSummaryService(req);
        return res.json(summary);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ===== Sales Summary Route =====
router.get("/sales/summary", authVerifyMiddleware, async (req, res) => {
    try {
        const summary = await salesSummaryService(req);
        return res.json(summary);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ===== Return Summary Route =====
router.get("/return/summary", authVerifyMiddleware, async (req, res) => {
    try {
        const summary = await returnSummaryService(req);
        return res.json(summary);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ===== Product Routes =====
router.post("/product/create", authVerifyMiddleware, ProductController.createProduct);
router.put("/product/update/:id", authVerifyMiddleware, ProductController.updateProduct);
router.get("/product/list/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ProductController.productList);
router.get("/product/delete/:id", authVerifyMiddleware, ProductController.deleteProduct); 

// ===== Purchase Routes =====
router.post("/purchase/create", authVerifyMiddleware, PurchaseController.createPurchase);
router.get("/purchase/list/:searchKeyword", authVerifyMiddleware, PurchaseController.purchaseList);
router.get("/purchase/delete/:id", authVerifyMiddleware, PurchaseController.purchaseDelete);

// ===== Sales Routes =====
router.post("/sales/create", authVerifyMiddleware, SalesController.createSales);
router.get("/sales/list/:searchKeyword", authVerifyMiddleware, SalesController.salesList);
router.get("/sales/delete/:id", authVerifyMiddleware, SalesController.salesDelete);

// ===== Return Routes =====
router.post("/return/create", authVerifyMiddleware, ReturnController.createReturn);
router.get("/return/list/:searchKeyword", authVerifyMiddleware, ReturnController.returnList);
router.get("/return/delete/:id", authVerifyMiddleware, ReturnController.returnDelete);

export default router;