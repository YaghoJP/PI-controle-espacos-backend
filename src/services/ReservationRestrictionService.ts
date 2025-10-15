import { PrismaClient } from "@prisma/client";
import {
  IReservationRestrictionService,
  CreateReservationRestrictionDTO,
  UpdateReservationRestrictionDTO,
  ReservationRestrictionDTO,
} from "../interfaces/ReservationRestrictionInterface";

export class ReservationRestrictionService implements IReservationRestrictionService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateReservationRestrictionDTO): Promise<ReservationRestrictionDTO> {
    const created = await this.prisma.reservation_restrictions.create({
      data: this.mapCreateData(data),
    });
    return this.serialize(created);
  }

  async list(): Promise<ReservationRestrictionDTO[]> {
    const items = await this.prisma.reservation_restrictions.findMany({
      orderBy: { id: "asc" },
    });
    return items.map(this.serialize);
  }

  async getById(id: number): Promise<ReservationRestrictionDTO | null> {
    const item = await this.prisma.reservation_restrictions.findUnique({ where: { id } });
    return item ? this.serialize(item) : null;
  }

  async update(id: number, data: UpdateReservationRestrictionDTO): Promise<ReservationRestrictionDTO | null> {
    const exists = await this.prisma.reservation_restrictions.findUnique({ where: { id } });
    if (!exists) return null;

    const updated = await this.prisma.reservation_restrictions.update({
      where: { id },
      data: this.mapUpdateData(data),
    });
    return this.serialize(updated);
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.prisma.reservation_restrictions.findUnique({ where: { id } });
    if (!exists) return false;
    await this.prisma.reservation_restrictions.delete({ where: { id } });
    return true;
  }

  private mapCreateData(d: CreateReservationRestrictionDTO) {
    return {
      space_id: d.space_id,
      ...(d.max_hours_per_day !== undefined ? { max_hours_per_day: d.max_hours_per_day } : {}),
      ...(d.max_reservations_per_user !== undefined
        ? { max_reservations_per_user: d.max_reservations_per_user }
        : {}),
      ...(d.allowed_start_time !== undefined
        ? { allowed_start_time: new Date(d.allowed_start_time) }
        : {}),
      ...(d.allowed_end_time !== undefined ? { allowed_end_time: new Date(d.allowed_end_time) } : {}),
      ...(d.restricted_days !== undefined ? { restricted_days: d.restricted_days } : {}),
    };
  }

  private mapUpdateData(d: UpdateReservationRestrictionDTO) {
    return {
      ...(d.space_id !== undefined ? { space_id: d.space_id } : {}),
      ...(d.max_hours_per_day !== undefined ? { max_hours_per_day: d.max_hours_per_day } : {}),
      ...(d.max_reservations_per_user !== undefined
        ? { max_reservations_per_user: d.max_reservations_per_user }
        : {}),
      ...(d.allowed_start_time !== undefined
        ? { allowed_start_time: new Date(d.allowed_start_time) }
        : {}),
      ...(d.allowed_end_time !== undefined ? { allowed_end_time: new Date(d.allowed_end_time) } : {}),
      ...(d.restricted_days !== undefined ? { restricted_days: d.restricted_days } : {}),
    };
  }

  private serialize = (row: any): ReservationRestrictionDTO => ({
    id: row.id,
    space_id: row.space_id,
    max_hours_per_day: row.max_hours_per_day ?? null,
    max_reservations_per_user: row.max_reservations_per_user ?? null,
    allowed_start_time: row.allowed_start_time ? new Date(row.allowed_start_time).toISOString() : null,
    allowed_end_time: row.allowed_end_time ? new Date(row.allowed_end_time).toISOString() : null,
    restricted_days: row.restricted_days ?? null,
  });
}
