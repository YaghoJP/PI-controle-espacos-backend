import { Router } from "express";
import { UserController } from "./controllers/UserController";

//Router
const router = Router();

//Rotas do usuario.
const user = new UserController();
router.post('/user', user.handleCreate.bind(user));
router.get('/users', user.handleList.bind(user));
router.get('/users/:id', user.handleListByID.bind(user));
router.put('/user/:id', user.handleUpdate.bind(user));
router.delete('/user/:id', user.handleDelete.bind(user));

export {router};