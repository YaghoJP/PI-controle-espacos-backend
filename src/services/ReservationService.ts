import prisma from "../prisma";
import {
  CreateReservationInterface,
  ListReservationInterface,
  UpdateReservationInterface,
  DeleteReservationInterface
} from "../interfaces/ReservationInterface";

class ReservationService {

  async checkAvailability({ space_id, start_time, end_time }: {
    space_id: number;
    start_time: Date;
    end_time: Date;
  }) {
    if (!space_id || !start_time || !end_time) {
      throw new Error("Campos obrigatórios: space_id, start_time, end_time");
    }

    const conflict = await prisma.reservations.findFirst({
      where: {
        space_id,
        AND: [
          { start_time: { lt: end_time } },
          { end_time: { gt: start_time } }
        ]
      }
    });

    return conflict ? false : true;
  }


  async create(data: CreateReservationInterface) {
    if (!data.user_id || !data.space_id || !data.start_time || !data.end_time) {
      throw new Error("Campos obrigatórios: user_id, space_id, start_time, end_time");
    }

    const isAvailable = await this.checkAvailability({
      space_id: data.space_id,
      start_time: data.start_time,
      end_time: data.end_time
    });

    if (!isAvailable) {
      throw new Error("O espaço já está reservado nesse intervalo de tempo!");
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

  async listBySpace(space_id: number) {
  if (!space_id) throw new Error("O space_id é obrigatório!");

  return await prisma.reservations.findMany({
    where: { space_id },
    include: {
      user: true,
      space: true,
      admin: true
    },
    orderBy: {
      start_time: "asc"
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
