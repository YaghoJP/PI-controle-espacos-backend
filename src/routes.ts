// src/routes.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { SpaceService } from "./services/SpaceService";
import { SpaceController } from "./controllers/SpaceController";

export function createAppRouter(prismaClient?: PrismaClient) {
  const router = Router();

  const prisma = prismaClient ?? new PrismaClient();
  const service = new SpaceService(prisma);
  const controller = new SpaceController(service);

  router.post("/spaces", controller.create);     // cria 1 ou N
  router.get("/spaces", controller.list);
  router.get("/spaces/:id", controller.getById);
  router.patch("/spaces/:id", controller.update);
  router.delete("/spaces/:id", controller.delete);

  return router;
}

const router = createAppRouter();
export default router;
