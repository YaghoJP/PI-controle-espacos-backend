import { z } from "zod";

export const DependentIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const DependentBaseInputSchema = z.object({
  user_id: z.coerce.number().int().positive(),
  name: z.string().min(1).optional(),           
  birth_date: z.coerce.date().optional(),       
  relationship: z.string().min(1).optional(),   
  created_at: z.coerce.date().optional(),       
});

export const CreateDependentSchema = DependentBaseInputSchema;
export const UpdateDependentSchema = DependentBaseInputSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Informe ao menos um campo para atualizar." }
);

export const DependentSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  name: z.string().nullable().optional(),
  birth_date: z.string().nullable().optional(),
  relationship: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
});

export type DependentDTO = z.infer<typeof DependentSchema>;
export type CreateDependentDTO = z.infer<typeof CreateDependentSchema>;
export type UpdateDependentDTO = z.infer<typeof UpdateDependentSchema>;

export interface IDependentService {
  create(data: CreateDependentDTO): Promise<DependentDTO>;
  list(): Promise<DependentDTO[]>;
  getById(id: number): Promise<DependentDTO | null>;
  update(id: number, data: UpdateDependentDTO): Promise<DependentDTO | null>;
  delete(id: number): Promise<boolean>;
}
