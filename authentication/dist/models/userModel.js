"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.saveResetToken = saveResetToken;
exports.findUserByResetToken = findUserByResetToken;
exports.updatePasswordAndClearResetToken = updatePasswordAndClearResetToken;
const db_1 = __importDefault(require("../config/db"));
async function createUser(user) {
    const [result] = await db_1.default.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [user.name, user.email, user.password]);
    return result.insertId;
}
async function findUserByEmail(email) {
    const [rows] = await db_1.default.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows[0] ?? null;
}
async function findUserById(id) {
    const [rows] = await db_1.default.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return rows[0] ?? null;
}
async function saveResetToken(userId, token, expiresAt) {
    await db_1.default.execute("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?", [token, expiresAt, userId]);
}
async function findUserByResetToken(token) {
    const [rows] = await db_1.default.execute("SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW() LIMIT 1", [token]);
    return rows[0] ?? null;
}
async function updatePasswordAndClearResetToken(userId, hashedPassword) {
    await db_1.default.execute(`UPDATE users
     SET password = ?, reset_token = NULL, reset_token_expiry = NULL
     WHERE id = ?`, [hashedPassword, userId]);
}
//# sourceMappingURL=userModel.js.map