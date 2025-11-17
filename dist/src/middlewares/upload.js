"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Caminho onde as imagens serão salvas
const uploadsPath = path_1.default.join(__dirname, "..", "..", "uploads", "users");
// Criar pasta uploads/users se não existir
if (!fs_1.default.existsSync(uploadsPath)) {
    fs_1.default.mkdirSync(uploadsPath, { recursive: true });
}
// Configuração do Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;
        cb(null, uniqueName);
    },
});
// Apenas permitir imagens
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Formato de arquivo inválido. Envie uma imagem."), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
});
