import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  IReservationRestrictionService,
  ReservationRestrictionIdParamSchema,
  CreateReservationRestrictionSchema,
  UpdateReservationRestrictionSchema,
} from "../interfaces/ReservationRestrictionInterface";

export class ReservationRestrictionController {
  constructor(private service: IReservationRestrictionService) {}

  // POST /reservation-restrictions
  create = async (req: Request, res: Response) => {
    try {
      const payload = CreateReservationRestrictionSchema.parse(req.body);
      const created = await this.service.create(payload);
      return res.status(201).json(created);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /reservation-restrictions
  list = async (_req: Request, res: Response) => {
    try {
      const items = await this.service.list();
      return res.status(200).json(items);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /reservation-restrictions/:id
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = ReservationRestrictionIdParamSchema.parse(req.params);
      const item = await this.service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `ReservationRestriction id=${id} não encontrado.` });
      }
      return res.status(200).json(item);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // PATCH /reservation-restrictions/:id
  update = async (req: Request, res: Response) => {
    try {
      const { id } = ReservationRestrictionIdParamSchema.parse(req.params);
      const data = UpdateReservationRestrictionSchema.parse(req.body);
      const updated = await this.service.update(id, data);
      if (!updated) {
        return res.status(404).json({ message: `ReservationRestriction id=${id} não encontrado.` });
      }
      return res.status(200).json(updated);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // DELETE /reservation-restrictions/:id
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = ReservationRestrictionIdParamSchema.parse(req.params);
      const ok = await this.service.delete(id);
      if (!ok) {
        return res.status(404).json({ message: `ReservationRestriction id=${id} não encontrado.` });
      }
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  };
}

function handleError(err: unknown, res: Response) {
  console.error("[ReservationRestrictionController] erro:", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos.",
      issues: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code,
      })),
    });
  }

  if (isPrismaKnownError(err)) {
    const e = err as any;
    const code = e.code as string;

    if (code === "P1000" || code === "P1001" || code === "P1002") {
      return res.status(503).json({
        message: "Serviço de banco de dados indisponível.",
        code,
        meta: e.meta ?? null,
      });
    }
    if (code === "P2002") {
      return res.status(409).json({
        message: "Violação de unicidade/constraint.",
        meta: e.meta ?? null,
      });
    }
    if (code === "P2025") {
      return res.status(404).json({
        message: "Registro não encontrado.",
        meta: e.meta ?? null,
      });
    }
    return res.status(400).json({
      message: "Erro de banco de dados (Prisma).",
      code,
      meta: e.meta ?? null,
    });
  }

  return res.status(500).json({ message: "Erro interno inesperado." });
}

function isPrismaKnownError(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in (err as any) &&
    typeof (err as any).code === "string" &&
    /^P1|^P2/.test((err as any).code as string)
  );
}
