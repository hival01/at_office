"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRegisterPage = showRegisterPage;
exports.registerUser = registerUser;
exports.showLoginPage = showLoginPage;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.showForgotPasswordPage = showForgotPasswordPage;
exports.sendResetLink = sendResetLink;
exports.showResetPasswordPage = showResetPasswordPage;
exports.resetPassword = resetPassword;
exports.showHomePage = showHomePage;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const token_1 = require("../utils/token");
const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function getSingleParam(param) {
    if (Array.isArray(param)) {
        return param[0] ?? "";
    }
    return param ?? "";
}
function renderView(res, view, data = {}, statusCode = 200) {
    res.status(statusCode).render(view, {
        error: data.error ?? "",
        success: data.success ?? "",
        values: data.values ?? {},
        resetLink: data.resetLink ?? "",
        token: data.token ?? "",
    });
}
function validateEmail(email) {
    return EMAIL_REGEX.test(email);
}
function showRegisterPage(req, res) {
    renderView(res, "register");
}
async function registerUser(req, res) {
    const name = String(req.body.name ?? "").trim();
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    if (!name || !email || !password) {
        renderView(res, "register", {
            error: "All fields are required.",
            values: { name, email },
        }, 400);
        return;
    }
    if (!validateEmail(email)) {
        renderView(res, "register", {
            error: "Please enter a valid email address.",
            values: { name, email },
        }, 400);
        return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        renderView(res, "register", {
            error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
            values: { name, email },
        }, 400);
        return;
    }
    const existingUser = await (0, userModel_1.findUserByEmail)(email);
    if (existingUser) {
        renderView(res, "register", {
            error: "An account with this email already exists.",
            values: { name, email },
        }, 409);
        return;
    }
    // bcrypt hashes the password so the real password is never stored in plain text.
    // If the database is leaked, hashed passwords are much harder to misuse.
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const userId = await (0, userModel_1.createUser)({ name, email, password: hashedPassword });
    req.session.user = { id: userId, name, email };
    res.redirect("/");
}
function showLoginPage(req, res) {
    renderView(res, "login");
}
async function loginUser(req, res) {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    if (!email || !password) {
        renderView(res, "login", {
            error: "Email and password are required.",
            values: { email },
        }, 400);
        return;
    }
    const user = await (0, userModel_1.findUserByEmail)(email);
    if (!user) {
        renderView(res, "login", {
            error: "Invalid email or password.",
            values: { email },
        }, 401);
        return;
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        renderView(res, "login", {
            error: "Invalid email or password.",
            values: { email },
        }, 401);
        return;
    }
    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    req.session.user = sessionUser;
    res.redirect("/");
}
function logoutUser(req, res) {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send("Unable to logout right now.");
            return;
        }
        res.redirect("/login");
    });
}
function showForgotPasswordPage(req, res) {
    renderView(res, "forgot-password");
}
async function sendResetLink(req, res) {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    if (!email) {
        renderView(res, "forgot-password", {
            error: "Please enter your email address.",
            values: { email },
        }, 400);
        return;
    }
    if (!validateEmail(email)) {
        renderView(res, "forgot-password", {
            error: "Please enter a valid email address.",
            values: { email },
        }, 400);
        return;
    }
    const user = await (0, userModel_1.findUserByEmail)(email);
    if (!user) {
        renderView(res, "forgot-password", {
            success: "If this email exists, a password reset link has been prepared.",
            values: { email: "" },
        });
        return;
    }
    // The token is a long random string generated with Node's crypto module.
    // Because it is unpredictable, attackers cannot easily guess a valid reset URL.
    const { token, expiresAt } = (0, token_1.generateResetToken)();
    await (0, userModel_1.saveResetToken)(user.id, token, expiresAt);
    const resetLink = `${req.protocol}://${req.get("host")}/reset-password/${token}`;
    renderView(res, "forgot-password", {
        success: "Password reset link generated successfully.",
        resetLink,
        values: { email: "" },
    });
}
async function showResetPasswordPage(req, res) {
    const token = getSingleParam(req.params.token);
    const user = await (0, userModel_1.findUserByResetToken)(token);
    if (!user) {
        renderView(res, "reset-password", { error: "This password reset link is invalid or has expired." }, 400);
        return;
    }
    renderView(res, "reset-password", { token });
}
async function resetPassword(req, res) {
    const token = getSingleParam(req.params.token);
    const password = String(req.body.password ?? "");
    const confirmPassword = String(req.body.confirmPassword ?? "");
    const user = await (0, userModel_1.findUserByResetToken)(token);
    if (!user) {
        renderView(res, "reset-password", { error: "This password reset link is invalid or has expired." }, 400);
        return;
    }
    if (!password || !confirmPassword) {
        renderView(res, "reset-password", {
            error: "Both password fields are required.",
            token,
        }, 400);
        return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        renderView(res, "reset-password", {
            error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
            token,
        }, 400);
        return;
    }
    if (password !== confirmPassword) {
        renderView(res, "reset-password", {
            error: "Passwords do not match.",
            token,
        }, 400);
        return;
    }
    // Password reset flow:
    // 1. Verify the token exists and has not expired.
    // 2. Hash the new password with bcrypt.
    // 3. Save the new hash and clear the reset token fields so the link cannot be reused.
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    await (0, userModel_1.updatePasswordAndClearResetToken)(user.id, hashedPassword);
    renderView(res, "login", {
        success: "Password updated successfully. Please login with your new password.",
    });
}
async function showHomePage(req, res) {
    const sessionUser = req.session.user;
    if (!sessionUser) {
        res.redirect("/login");
        return;
    }
    const user = await (0, userModel_1.findUserById)(sessionUser.id);
    if (!user) {
        req.session.destroy(() => {
            res.redirect("/login");
        });
        return;
    }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dashboard</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 720px; margin: 40px auto; padding: 24px; line-height: 1.6; }
        .card { border: 1px solid #d1d5db; border-radius: 12px; padding: 24px; background: #f8fafc; }
        button { background: #111827; color: white; border: none; border-radius: 8px; padding: 10px 16px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Welcome, ${user.name}!</h1>
        <p>You are logged in with <strong>${user.email}</strong>.</p>
        <p>This page confirms that the session-based login system is working.</p>
        <form method="POST" action="/logout">
          <button type="submit">Logout</button>
        </form>
      </div>
    </body>
    </html>
  `);
}
//# sourceMappingURL=authController.js.map