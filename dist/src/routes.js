"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const SpaceController_1 = require("./controllers/SpaceController");
const SpaceService_1 = require("./services/SpaceService");
const DependentController_1 = require("./controllers/DependentController");
const DependentService_1 = require("./services/DependentService"); // ajuste o nome se seu arquivo for DependentServices.ts
const ReservationController_1 = require("./controllers/ReservationController");
const prisma_1 = __importDefault(require("./prisma"));
const authController_1 = require("./controllers/authController");
const Auth_1 = require("./middlewares/Auth");
const SpaceController_2 = require("./controllers/SpaceController"); // exportamos o multer do controller
//Router
const router = (0, express_1.Router)();
exports.router = router;
//Rotas do usuario.
const user = new UserController_1.UserController();
const auth = new authController_1.AuthController();
router.post('/user', Auth_1.authenticateUser, user.handleCreate.bind(user));
router.post('/session', auth.login.bind(auth));
router.get('/users', Auth_1.authenticateUser, user.handleList.bind(user));
router.get('/users/:id', Auth_1.authenticateUser, user.handleListByID.bind(user));
router.put('/user/:id', Auth_1.authenticateUser, user.handleUpdate.bind(user));
router.delete('/user/:id', Auth_1.authenticateUser, user.handleDelete.bind(user));
const service = new SpaceService_1.SpaceService(prisma_1.default);
const controller = new SpaceController_1.SpaceController(service);
router.post("/spaces", Auth_1.authenticateUser, controller.create); // cria 1 ou N
router.get("/spaces", Auth_1.authenticateUser, controller.list);
router.get("/spaces/:id", Auth_1.authenticateUser, controller.getById);
router.patch("/spaces/:id", Auth_1.authenticateUser, controller.update);
router.delete("/spaces/:id", Auth_1.authenticateUser, controller.delete);
router.post("/spaces/:id/image", Auth_1.authenticateUser, SpaceController_2.upload.single("image"), controller.uploadImage.bind(controller));
const dependentService = new DependentService_1.DependentService(prisma_1.default);
const dependentController = new DependentController_1.DependentController(dependentService);
router.post("/dependents", Auth_1.authenticateUser, dependentController.create);
router.get("/dependents", Auth_1.authenticateUser, dependentController.list);
router.get("/dependents/:id", Auth_1.authenticateUser, dependentController.getById);
router.patch("/dependents/:id", Auth_1.authenticateUser, dependentController.update);
router.delete("/dependents/:id", Auth_1.authenticateUser, dependentController.delete);
const reservationController = new ReservationController_1.ReservationController();
router.post("/reservations", Auth_1.authenticateUser, reservationController.create.bind(reservationController));
router.get("/reservations", Auth_1.authenticateUser, reservationController.list.bind(reservationController));
router.get("/reservations/:id", Auth_1.authenticateUser, reservationController.getById.bind(reservationController));
router.patch("/reservations/:id", Auth_1.authenticateUser, reservationController.update.bind(reservationController));
router.delete("/reservations/:id", Auth_1.authenticateUser, reservationController.delete.bind(reservationController));
