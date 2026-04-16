"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authController_1.showHomePage);
router.get("/register", authController_1.showRegisterPage);
router.post("/register", authController_1.registerUser);
router.get("/login", authController_1.showLoginPage);
router.post("/login", authController_1.loginUser);
router.post("/logout", authMiddleware_1.isAuthenticated, authController_1.logoutUser);
router.get("/forgot-password", authController_1.showForgotPasswordPage);
router.post("/forgot-password", authController_1.sendResetLink);
router.get("/reset-password/:token", authController_1.showResetPasswordPage);
router.post("/reset-password/:token", authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map