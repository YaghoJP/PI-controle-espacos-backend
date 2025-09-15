import { PrismaClient } from "@prisma/client";
import {
  ISpaceService,
  CreateSpaceDTO,
  UpdateSpaceDTO,
  SpaceDTO,
  CreateSpaceInput,
} from "../interfaces/SpaceInterface";

export class SpaceService implements ISpaceService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSpaceInput): Promise<SpaceDTO | SpaceDTO[]> {
    if (Array.isArray(data)) {
      const createdSpaces = await this.prisma.$transaction(
        data.map((space) =>
          this.prisma.spaces.create({
            data: this.mapCreateData(space),
          })
        )
      );
      return createdSpaces.map((item: any) => {
        const { created_at, ...rest } = item;
        return { ...rest, createdAt: created_at } as SpaceDTO;
      });
    } else {
      const created = await this.prisma.spaces.create({
        data: this.mapCreateData(data),
      });
      const { created_at, ...rest } = created as any;
      return { ...rest, createdAt: created_at } as SpaceDTO;
    }
  }

  private mapCreateData(d: CreateSpaceDTO) {
    return {
      name: d.name,
      description: d.description,
      capacity: d.capacity,
      available: d.available,
      created_at: new Date(),
    };
  }
  async list(): Promise<SpaceDTO[]> {
    const items = await this.prisma.spaces.findMany({ orderBy: { id: "asc" } });
    return items.map((item: any) => {
      const { created_at, ...rest } = item;
      return { ...rest, createdAt: created_at } as SpaceDTO;
    });
  }

  async getById(id: number): Promise<SpaceDTO | null> {
    const item = await this.prisma.spaces.findUnique({ where: { id } });
    if (!item) return null;
    const { created_at, ...rest } = item as any;
    return { ...rest, createdAt: created_at } as SpaceDTO;
  }

  async update(id: number, data: UpdateSpaceDTO): Promise<SpaceDTO | null> {
    const exists = await this.prisma.spaces.findUnique({ where: { id } });
    if (!exists) return null;

    const updated = await this.prisma.spaces.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
        ...(data.available !== undefined ? { available: data.available } : {}),
        ...(data.createdAt !== undefined ? { createdAt: data.createdAt } : {}),
      },
    });
    // Map created_at to createdAt for SpaceDTO
    const { created_at, ...rest } = updated as any;
    return { ...rest, createdAt: created_at } as SpaceDTO;
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.prisma.spaces.findUnique({ where: { id } });
    if (!exists) return false;
    await this.prisma.spaces.delete({ where: { id } });
    return true;
  }
}
