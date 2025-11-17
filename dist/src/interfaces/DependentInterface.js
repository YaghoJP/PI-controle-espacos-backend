"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependentSchema = exports.UpdateDependentSchema = exports.CreateDependentSchema = exports.DependentBaseInputSchema = exports.DependentIdParamSchema = void 0;
const zod_1 = require("zod");
exports.DependentIdParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});
exports.DependentBaseInputSchema = zod_1.z.object({
    user_id: zod_1.z.coerce.number().int().positive(),
    name: zod_1.z.string().min(1).optional(),
    birth_date: zod_1.z.coerce.date().optional(),
    relationship: zod_1.z.string().min(1).optional(),
    created_at: zod_1.z.coerce.date().optional(),
});
exports.CreateDependentSchema = exports.DependentBaseInputSchema;
exports.UpdateDependentSchema = exports.DependentBaseInputSchema.partial().refine((data) => Object.keys(data).length > 0, { message: "Informe ao menos um campo para atualizar." });
exports.DependentSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    user_id: zod_1.z.number().int().positive(),
    name: zod_1.z.string().nullable().optional(),
    birth_date: zod_1.z.string().nullable().optional(),
    relationship: zod_1.z.string().nullable().optional(),
    created_at: zod_1.z.string().nullable().optional(),
});
