import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const SpaceBaseInputSchema = z.object({
  name: z.string().min(1, "name é obrigatório"),
  description: z.string().default(""),
  capacity: z.coerce.number().int().nonnegative(),
  available: z.coerce.boolean(),
  createdAt: z.coerce.date().optional(),
});

export const CreateSpaceSchema = SpaceBaseInputSchema;

export const BulkCreateSchema = z
  .array(CreateSpaceSchema)
  .min(1, "Forneça ao menos um espaço para criar");

export const CreateSpaceInputSchema = z.union([
  CreateSpaceSchema,
  BulkCreateSchema,
]);

export const UpdateSpaceSchema = SpaceBaseInputSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Informe ao menos um campo para atualizar." }
);

export const SpaceSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string(),
  capacity: z.number().int(),
  available: z.boolean(),
  createdAt: z.date(),
});

export type SpaceDTO = z.infer<typeof SpaceSchema>;
export type CreateSpaceDTO = z.infer<typeof CreateSpaceSchema>;
export type CreateSpaceInput = z.infer<typeof CreateSpaceInputSchema>;
export type UpdateSpaceDTO = z.infer<typeof UpdateSpaceSchema>;

export interface ISpaceService {
  create(data: CreateSpaceInput): Promise<SpaceDTO | SpaceDTO[]>;
  list(): Promise<SpaceDTO[]>;
  getById(id: number): Promise<SpaceDTO | null>;
  update(id: number, data: UpdateSpaceDTO): Promise<SpaceDTO | null>;
  delete(id: number): Promise<boolean>;
}
