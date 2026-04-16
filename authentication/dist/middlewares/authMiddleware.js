"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
exports.attachUserToLocals = attachUserToLocals;
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }
    next();
}
function attachUserToLocals(req, res, next) {
    res.locals.currentUser = req.session.user ?? null;
    next();
}
//# sourceMappingURL=authMiddleware.js.map