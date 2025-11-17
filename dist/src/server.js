"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use(ErrorHandler_1.HandleError);
app.use("/uploads", express_1.default.static(path_1.default.resolve(process.cwd(), "uploads")));
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
