import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SpaceController } from "./controllers/SpaceController";
import { SpaceService } from "./services/SpaceService";
import { DependentController } from "./controllers/DependentController";
import { DependentService } from "./services/DependentService"; // ajuste o nome se seu arquivo for DependentServices.ts

import prisma from "./prisma";

//Router
const router = Router();

//Rotas do usuario.
const user = new UserController();
router.post('/user', user.handleCreate.bind(user));
router.get('/users', user.handleList.bind(user));
router.get('/users/:id', user.handleListByID.bind(user));
router.put('/user/:id', user.handleUpdate.bind(user));
router.delete('/user/:id', user.handleDelete.bind(user));

const service = new SpaceService(prisma);
const controller = new SpaceController(service);
router.post("/spaces", controller.create);     // cria 1 ou N
router.get("/spaces", controller.list);
router.get("/spaces/:id", controller.getById);
router.patch("/spaces/:id", controller.update);
router.delete("/spaces/:id", controller.delete);

const dependentService = new DependentService(prisma);
const dependentController = new DependentController(dependentService);

router.post("/dependents", dependentController.create);
router.get("/dependents", dependentController.list);
router.get("/dependents/:id", dependentController.getById);
router.patch("/dependents/:id", dependentController.update);
router.delete("/dependents/:id", dependentController.delete);



export {router};

