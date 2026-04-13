"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.port || 3010;
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((req, res) => {
    res.status(404).json({
        success: "false",
        message: "page not found",
    });
});
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map