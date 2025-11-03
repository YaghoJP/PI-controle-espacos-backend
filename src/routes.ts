import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SpaceController } from "./controllers/SpaceController";
import { SpaceService } from "./services/SpaceService";
import { DependentController } from "./controllers/DependentController";
import { DependentService } from "./services/DependentService"; // ajuste o nome se seu arquivo for DependentServices.ts
import { ReservationController } from "./controllers/ReservationController";
import prisma from "./prisma";
import { AuthController } from "./controllers/authController";
import { authenticateUser } from "./middlewares/Auth";
//Router
const router = Router();

//Rotas do usuario.
const user = new UserController();
const auth = new AuthController();
router.post('/user', authenticateUser, user.handleCreate.bind(user));
router.post('/session', auth.login.bind(auth));
router.get('/users', authenticateUser, user.handleList.bind(user));
router.get('/users/:id', authenticateUser, user.handleListByID.bind(user));
router.put('/user/:id', authenticateUser, user.handleUpdate.bind(user));
router.delete('/user/:id', authenticateUser, user.handleDelete.bind(user));

const service = new SpaceService(prisma);
const controller = new SpaceController(service);
router.post("/spaces", authenticateUser, controller.create);     // cria 1 ou N
router.get("/spaces", authenticateUser, controller.list);
router.get("/spaces/:id", authenticateUser, controller.getById);
router.patch("/spaces/:id", authenticateUser, controller.update);
router.delete("/spaces/:id", authenticateUser, controller.delete);

const dependentService = new DependentService(prisma);
const dependentController = new DependentController(dependentService);

router.post("/dependents", authenticateUser ,dependentController.create);
router.get("/dependents", authenticateUser, dependentController.list);
router.get("/dependents/:id", authenticateUser, dependentController.getById);
router.patch("/dependents/:id", authenticateUser, dependentController.update);
router.delete("/dependents/:id", authenticateUser ,dependentController.delete);

const reservationController = new ReservationController();
router.post("/reservations", authenticateUser, reservationController.create.bind(reservationController));
router.get("/reservations", authenticateUser, reservationController.list.bind(reservationController));
router.get("/reservations/:id", authenticateUser, reservationController.getById.bind(reservationController));
router.patch("/reservations/:id", authenticateUser, reservationController.update.bind(reservationController));
router.delete("/reservations/:id", authenticateUser, reservationController.delete.bind(reservationController));

export {router};

