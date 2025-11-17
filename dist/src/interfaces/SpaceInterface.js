"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceSchema = exports.UpdateSpaceSchema = exports.CreateSpaceInputSchema = exports.BulkCreateSchema = exports.CreateSpaceSchema = exports.SpaceBaseInputSchema = exports.IdParamSchema = void 0;
const zod_1 = require("zod");
exports.IdParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});
exports.SpaceBaseInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "name é obrigatório"),
    description: zod_1.z.string().default(""),
    capacity: zod_1.z.coerce.number().int().nonnegative(),
    available: zod_1.z.coerce.boolean(),
    createdAt: zod_1.z.coerce.date().optional(),
    imageUrl: zod_1.z.string().url().optional(),
});
exports.CreateSpaceSchema = exports.SpaceBaseInputSchema;
exports.BulkCreateSchema = zod_1.z
    .array(exports.CreateSpaceSchema)
    .min(1, "Forneça ao menos um espaço para criar");
exports.CreateSpaceInputSchema = zod_1.z.union([
    exports.CreateSpaceSchema,
    exports.BulkCreateSchema,
]);
exports.UpdateSpaceSchema = exports.SpaceBaseInputSchema.partial().refine((data) => Object.keys(data).length > 0, { message: "Informe ao menos um campo para atualizar." });
exports.SpaceSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    capacity: zod_1.z.number().int(),
    available: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    imageUrl: zod_1.z.string().nullable().optional(),
});
