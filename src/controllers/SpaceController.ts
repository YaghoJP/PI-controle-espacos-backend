import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  ISpaceService,
  IdParamSchema,
  UpdateSpaceSchema,
  CreateSpaceInputSchema,
} from "../interfaces/SpaceInterface";

export class SpaceController {
  constructor(private service: ISpaceService) {}

  // POST /spaces   
  create = async (req: Request, res: Response) => {
    console.log("Chegou no controller");
    try {
      const payload = CreateSpaceInputSchema.parse(req.body);
      const created = await this.service.create(payload);
      return res.status(201).json(created);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /spaces
  list = async (_req: Request, res: Response) => {
    try {
      const items = await this.service.list();
      return res.status(200).json(items);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /spaces/:id
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const item = await this.service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `Space id=${id} não encontrado.` });
      }
      return res.status(200).json(item);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // PATCH /spaces/:id
  update = async (req: Request, res: Response) => {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const data = UpdateSpaceSchema.parse(req.body);
      const updated = await this.service.update(id, data);
      if (!updated) {
        return res.status(404).json({ message: `Space id=${id} não encontrado.` });
      }
      return res.status(200).json(updated);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // DELETE /spaces/:id
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const ok = await this.service.delete(id);
      if (!ok) {
        return res.status(404).json({ message: `Space id=${id} não encontrado.` });
      }
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  };
}

function handleError(err: unknown, res: Response) {
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
    if (code === "P2002") {
      return res.status(409).json({
        message: "Violação de unicidade em um ou mais campos.",
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
    (err as any).code.startsWith("P2")
  );
}
