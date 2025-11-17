"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    handleCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body;
                return res.status(201).json(yield this.userService.create({
                    name,
                    email,
                    password,
                    role
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.userService.list());
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password, role } = req.body;
                return res.status(200).json(yield this.userService.update({
                    id: Number(id),
                    name,
                    email,
                    password,
                    role: role,
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.status(200).json(yield this.userService.delete({
                    id: Number(id),
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleListByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.status(200).json(yield this.userService.listByID({
                    id: Number(id),
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.id);
                if (!req.file) {
                    return res.status(400).json({ error: "Nenhuma imagem enviada" });
                }
                const imageUrl = `/uploads/users/${req.file.filename}`;
                const updated = yield this.userService.updateImage({
                    id: userId,
                    imageUrl,
                });
                return res.status(200).json(updated);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
