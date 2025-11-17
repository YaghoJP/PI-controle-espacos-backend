import { z } from "zod";

export const ReservationRestrictionIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const ReservationRestrictionBaseInputSchema = z.object({
  space_id: z.coerce.number().int().positive(),
  max_hours_per_day: z.coerce.number().int().optional(),
  max_reservations_per_user: z.coerce.number().int().optional(),
  allowed_start_time: z.coerce.date().optional(),
  allowed_end_time: z.coerce.date().optional(),
  restricted_days: z.string().optional(),
});

export const CreateReservationRestrictionSchema = ReservationRestrictionBaseInputSchema;

export const UpdateReservationRestrictionSchema = ReservationRestrictionBaseInputSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Informe ao menos um campo para atualizar." }
);

export const ReservationRestrictionSchema = z.object({
  id: z.number().int().positive(),
  space_id: z.number().int().positive(),
  max_hours_per_day: z.number().int().nullable().optional(),
  max_reservations_per_user: z.number().int().nullable().optional(),
  allowed_start_time: z.string().nullable().optional(), // retorna como string ISO
  allowed_end_time: z.string().nullable().optional(),   // retorna como string ISO
  restricted_days: z.string().nullable().optional(),
});

export type ReservationRestrictionDTO = z.infer<typeof ReservationRestrictionSchema>;
export type CreateReservationRestrictionDTO = z.infer<typeof CreateReservationRestrictionSchema>;
export type UpdateReservationRestrictionDTO = z.infer<typeof UpdateReservationRestrictionSchema>;

export interface IReservationRestrictionService {
  create(data: CreateReservationRestrictionDTO): Promise<ReservationRestrictionDTO>;
  list(): Promise<ReservationRestrictionDTO[]>;
  getById(id: number): Promise<ReservationRestrictionDTO | null>;
  update(id: number, data: UpdateReservationRestrictionDTO): Promise<ReservationRestrictionDTO | null>;
  delete(id: number): Promise<boolean>;
}
