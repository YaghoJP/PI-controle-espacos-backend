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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependentController = void 0;
const zod_1 = require("zod");
const DependentInterface_1 = require("../interfaces/DependentInterface");
function normalizePayload(obj) {
    if (!obj || typeof obj !== "object")
        return obj;
    if ("userId" in obj && !("user_id" in obj)) {
        obj.user_id = obj.userId;
        delete obj.userId;
    }
    if ("birthDate" in obj && !("birth_date" in obj)) {
        obj.birth_date = obj.birthDate;
        delete obj.birthDate;
    }
    if ("createdAt" in obj && !("created_at" in obj)) {
        obj.created_at = obj.createdAt;
        delete obj.createdAt;
    }
    return obj;
}
class DependentController {
    constructor(service) {
        this.service = service;
        // POST /dependents
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const normalized = normalizePayload(req.body);
                const payload = DependentInterface_1.CreateDependentSchema.parse(normalized);
                const created = yield this.service.create(payload);
                return res.status(201).json(created);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // GET /dependents
        this.list = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.service.list();
                return res.status(200).json(items);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // GET /dependents/:id
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = DependentInterface_1.DependentIdParamSchema.parse(req.params);
                const item = yield this.service.getById(id);
                if (!item) {
                    return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
                }
                return res.status(200).json(item);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // PATCH /dependents/:id
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = DependentInterface_1.DependentIdParamSchema.parse(req.params);
                const normalized = normalizePayload(req.body);
                const data = DependentInterface_1.UpdateDependentSchema.parse(normalized);
                const updated = yield this.service.update(id, data);
                if (!updated) {
                    return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
                }
                return res.status(200).json(updated);
            }
            catch (err) {
                return handleError(err, res);
            }
        });
        // DELETE /dependents/:id
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = DependentInterface_1.DependentIdParamSchema.parse(req.params);
                const ok = yield this.service.delete(id);
                if (!ok) {
                    return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
                }
                return res.status(204).send();
            }
            catch (err) {
                return handleError(err, res);
            }
        });
    }
}
exports.DependentController = DependentController;
function handleError(err, res) {
    var _a, _b, _c, _d;
    console.error("[DependentController] erro:", err);
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
        if (code === "P1000" || code === "P1001" || code === "P1002") {
            return res.status(503).json({
                message: "Serviço de banco de dados indisponível.",
                code,
                meta: (_a = e.meta) !== null && _a !== void 0 ? _a : null,
            });
        }
        if (code === "P2002") {
            return res.status(409).json({
                message: "Violação de unicidade/constraint.",
                meta: (_b = e.meta) !== null && _b !== void 0 ? _b : null,
            });
        }
        if (code === "P2025") {
            return res.status(404).json({
                message: "Registro não encontrado.",
                meta: (_c = e.meta) !== null && _c !== void 0 ? _c : null,
            });
        }
        return res.status(400).json({
            message: "Erro de banco de dados (Prisma).",
            code,
            meta: (_d = e.meta) !== null && _d !== void 0 ? _d : null,
        });
    }
    return res.status(500).json({ message: "Erro interno inesperado." });
}
function isPrismaKnownError(err) {
    return (!!err &&
        typeof err === "object" &&
        "code" in err &&
        typeof err.code === "string" &&
        /^P1|^P2/.test(err.code));
}
