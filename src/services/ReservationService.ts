import prisma from "../prisma";
import {
  CreateReservationInterface,
  ListReservationInterface,
  UpdateReservationInterface,
  DeleteReservationInterface
} from "../interfaces/ReservationInterface";

class ReservationService {
  async create(data: CreateReservationInterface) {
    if (!data.user_id || !data.space_id || !data.start_time || !data.end_time) {
      throw new Error("Campos obrigatórios: user_id, space_id, start_time, end_time");
    }

    return await prisma.reservations.create({ data });
  }

  async list() {
    return await prisma.reservations.findMany({
      include: {
        user: true,
        space: true,
        admin: true
      }
    });
  }

  async listByID({ id }: ListReservationInterface) {
    if (!id) throw new Error("O ID é obrigatório!");

    return await prisma.reservations.findFirst({
      where: { id },
      include: {
        user: true,
        space: true,
        admin: true
      }
    });
  }

  async update({ id, ...data }: UpdateReservationInterface) {
    if (!id) throw new Error("O ID é obrigatório!");

    return await prisma.reservations.update({
      where: { id },
      data
    });
  }

  async delete({ id }: DeleteReservationInterface) {
    if (!id) throw new Error("O ID é obrigatório!");

    return await prisma.reservations.delete({
      where: { id }
    });
  }
}

export { ReservationService };
