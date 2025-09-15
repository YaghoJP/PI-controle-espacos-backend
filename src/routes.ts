import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SpaceController } from "./controllers/SpaceController";
import { SpaceService } from "./services/SpaceService";
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

export {router};

