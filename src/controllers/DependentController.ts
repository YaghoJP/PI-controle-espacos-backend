import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  IDependentService,
  DependentIdParamSchema,
  CreateDependentSchema,
  UpdateDependentSchema,
} from "../interfaces/DependentInterface";

function normalizePayload(obj: any) {
  if (!obj || typeof obj !== "object") return obj;

  if ("userId" in obj && !("user_id" in obj)) {
    obj.user_id = obj.userId;
    delete obj.userId;
  }

  if ("birthDate" in obj && !("birth_date" in obj)) {
    obj.birth_date = obj.birthDate;
    delete obj.birthDate;
  }

  if ("createdAt" in obj && !("created_at" in obj)) {
    obj.created_at = obj.createdAt;
    delete obj.createdAt;
  }

  return obj;
}

export class DependentController {
  constructor(private service: IDependentService) {}

  // POST /dependents
  create = async (req: Request, res: Response) => {
    try {
      const normalized = normalizePayload(req.body);
      const payload = CreateDependentSchema.parse(normalized);
      const created = await this.service.create(payload);
      return res.status(201).json(created);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /dependents
  list = async (_req: Request, res: Response) => {
    try {
      const items = await this.service.list();
      return res.status(200).json(items);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // GET /dependents/:id
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = DependentIdParamSchema.parse(req.params);
      const item = await this.service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
      }
      return res.status(200).json(item);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // PATCH /dependents/:id
  update = async (req: Request, res: Response) => {
    try {
      const { id } = DependentIdParamSchema.parse(req.params);
      const normalized = normalizePayload(req.body);
      const data = UpdateDependentSchema.parse(normalized);
      const updated = await this.service.update(id, data);
      if (!updated) {
        return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
      }
      return res.status(200).json(updated);
    } catch (err) {
      return handleError(err, res);
    }
  };

  // DELETE /dependents/:id
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = DependentIdParamSchema.parse(req.params);
      const ok = await this.service.delete(id);
      if (!ok) {
        return res.status(404).json({ message: `Dependent id=${id} não encontrado.` });
      }
      return res.status(204).send();
    } catch (err) {
      return handleError(err, res);
    }
  };
}

function handleError(err: unknown, res: Response) {
  console.error("[DependentController] erro:", err);

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
