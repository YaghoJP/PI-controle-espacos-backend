"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceController = exports.upload = void 0;
const zod_1 = require("zod");
const SpaceInterface_1 = require("../interfaces/SpaceInterface");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, path_1.default.resolve(process.cwd(), "uploads")),
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const base = crypto_1.default.randomBytes(16).toString("hex");
        cb(null, `${base}${ext}`);
    },
});
function fileFilter(_req, file, cb) {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype))
        return cb(new Error("Tipo de arquivo não suportado."));
    cb(null, true);
}
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
class SpaceController {
    constructor(service) {
        this.service = service;
        // POST /spaces   
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Chegou no controller");
            try {
                const payload = SpaceInterface_1.CreateSpaceInputSchema.parse(req.body);
                const created = yield this.service.create(payload);
                return res.status(201).json(created);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // POST /spaces/:id/image  (multipart/form-data, campo "image")
        this.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = SpaceInterface_1.IdParamSchema.parse(req.params);
                // multer popula req.file
                if (!req.file) {
                    return res.status(400).json({ message: "Arquivo não enviado. Use o campo 'image'." });
                }
                // Monte a URL pública (depende do static em server.ts; veja nota abaixo)
                // Ex.: app.use("/uploads", express.static("uploads"))
                const publicUrl = `/uploads/${req.file.filename}`;
                const updated = yield this.service.update(id, { imageUrl: publicUrl });
                if (!updated) {
                    return res.status(404).json({ message: `Space id=${id} não encontrado.` });
                }
                return res.status(200).json(updated);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // GET /spaces
        this.list = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.service.list();
                return res.status(200).json(items);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // GET /spaces/:id
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = SpaceInterface_1.IdParamSchema.parse(req.params);
                const item = yield this.service.getById(id);
                if (!item) {
                    return res.status(404).json({ message: `Space id=${id} não encontrado.` });
                }
                return res.status(200).json(item);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // PATCH /spaces/:id
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = SpaceInterface_1.IdParamSchema.parse(req.params);
                const data = SpaceInterface_1.UpdateSpaceSchema.parse(req.body);
                const updated = yield this.service.update(id, data);
                if (!updated) {
                    return res.status(404).json({ message: `Space id=${id} não encontrado.` });
                }
                return res.status(200).json(updated);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // DELETE /spaces/:id
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = SpaceInterface_1.IdParamSchema.parse(req.params);
                const ok = yield this.service.delete(id);
                if (!ok) {
                    return res.status(404).json({ message: `Space id=${id} não encontrado.` });
                }
                return res.status(204).send();
            }
            catch (err) {
                return handleError(err, res);
            }
        });
    }
}
exports.SpaceController = SpaceController;
function handleError(err, res) {
    var _a, _b, _c;
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Dados inválidos.",
            issues: err.issues.map((i) => ({
                path: i.path.join("."),
                message: i.message,
                code: i.code,
            })),
        });
    }
    if (isPrismaKnownError(err)) {
        const e = err;
        const code = e.code;
        if (code === "P2002") {
            return res.status(409).json({
                message: "Violação de unicidade em um ou mais campos.",
                meta: (_a = e.meta) !== null && _a !== void 0 ? _a : null,
            });
        }
        if (code === "P2025") {
            return res.status(404).json({
                message: "Registro não encontrado.",
                meta: (_b = e.meta) !== null && _b !== void 0 ? _b : null,
            });
        }
        return res.status(400).json({
            message: "Erro de banco de dados (Prisma).",
            code,
            meta: (_c = e.meta) !== null && _c !== void 0 ? _c : null,
        });
    }
    return res.status(500).json({ message: "Erro interno inesperado." });
}
function isPrismaKnownError(err) {
    return (!!err &&
        typeof err === "object" &&
        "code" in err &&
        typeof err.code === "string" &&
        err.code.startsWith("P2"));
}
