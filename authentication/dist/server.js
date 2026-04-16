"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        await db_1.default.getConnection().then((connection) => connection.release());
        app_1.default.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to the database.", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map