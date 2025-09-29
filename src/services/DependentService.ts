import { PrismaClient } from "@prisma/client";
import {
  IDependentService,
  CreateDependentDTO,
  UpdateDependentDTO,
  DependentDTO,
} from "../interfaces/DependentInterface";

export class DependentService implements IDependentService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateDependentDTO): Promise<DependentDTO> {
    const created = await this.prisma.dependents.create({
      data: this.mapCreateData(data),
    });
    return this.serialize(created);
  }

  async list(): Promise<DependentDTO[]> {
    const items = await this.prisma.dependents.findMany({ orderBy: { id: "asc" } });
    return items.map(this.serialize);
  }

  async getById(id: number): Promise<DependentDTO | null> {
    const item = await this.prisma.dependents.findUnique({ where: { id } });
    return item ? this.serialize(item) : null;
  }

  async update(id: number, data: UpdateDependentDTO): Promise<DependentDTO | null> {
    const exists = await this.prisma.dependents.findUnique({ where: { id } });
    if (!exists) return null;

    const updated = await this.prisma.dependents.update({
      where: { id },
      data: this.mapUpdateData(data),
    });
    return this.serialize(updated);
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.prisma.dependents.findUnique({ where: { id } });
    if (!exists) return false;
    await this.prisma.dependents.delete({ where: { id } });
    return true;
  }

  private mapCreateData(d: CreateDependentDTO) {
    return {
      user_id: d.user_id,
      ...(d.name !== undefined ? { name: d.name } : {}),
      ...(d.birth_date !== undefined ? { birth_date: new Date(d.birth_date) } : {}),
      ...(d.relationship !== undefined ? { relationship: d.relationship } : {}),
      created_at: d.created_at ? new Date(d.created_at) : new Date(), // garante valor
    };
  }

  private mapUpdateData(d: UpdateDependentDTO) {
    return {
      ...(d.user_id !== undefined ? { user_id: d.user_id } : {}),
      ...(d.name !== undefined ? { name: d.name } : {}),
      ...(d.birth_date !== undefined ? { birth_date: new Date(d.birth_date) } : {}),
      ...(d.relationship !== undefined ? { relationship: d.relationship } : {}),
      ...(d.created_at !== undefined ? { created_at: new Date(d.created_at) } : {}),
    };
  }

  private serialize = (row: any): DependentDTO => ({
    id: row.id,
    user_id: row.user_id,
    name: row.name ?? null,
    birth_date: row.birth_date ? new Date(row.birth_date).toISOString() : null,
    relationship: row.relationship ?? null,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
  });
}
