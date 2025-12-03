import { Request, Response, NextFunction } from "express";
import { ReservationService } from "../services/ReservationService";

class ReservationController {
  private service: ReservationService;

  constructor() {
    this.service = new ReservationService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json(await this.service.create(req.body));
    } catch (error: any) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(await this.service.list());
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      return res.status(200).json(await this.service.listByID({ id: Number(id) }));
    } catch (error: any) {
      next(error);
    }
  }

  async listBySpace(req: Request, res: Response, next: NextFunction) {
    try {
      const { space_id } = req.params;

      return res
        .status(200)
        .json(await this.service.listBySpace(Number(space_id)));
    } catch (error: any) {
      next(error);
    }
  }


  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      return res.status(200).json(await this.service.update({ id: Number(id), ...req.body }));
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      return res.status(200).json(await this.service.delete({ id: Number(id) }));
    } catch (error: any) {
      next(error);
    }
  }
}

export { ReservationController };
