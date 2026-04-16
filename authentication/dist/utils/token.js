"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = generateResetToken;
const crypto_1 = __importDefault(require("crypto"));
const RESET_TOKEN_EXPIRY_MS = 1000 * 60 * 60;
function generateResetToken() {
    return {
        token: crypto_1.default.randomBytes(32).toString("hex"),
        expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY_MS),
    };
}
//# sourceMappingURL=token.js.map