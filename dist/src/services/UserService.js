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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = require("bcrypt");
//CRUD -> CREATE | READ | UPDATE | DELETE
class UserService {
    userAlreadyExist() {
        return __awaiter(this, arguments, void 0, function* (email = '', id = null) {
            if (email) {
                const userAlreadyExist = yield prisma_1.default.users.findFirst({
                    where: {
                        email
                    }
                });
                if (userAlreadyExist) {
                    return true;
                }
            }
            if (id) {
                const userAlreadyExist = yield prisma_1.default.users.findFirst({
                    where: {
                        id: id
                    }
                });
                if (userAlreadyExist) {
                    return true;
                }
            }
            return false;
        });
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, role, imageUser }) {
            if (!name || !email || !password) {
                throw new Error("Credenciais de Nome, Email e Senha são obrigatórios.");
            }
            if (email && !/\S+@\S+\.\S+/.test(email)) {
                throw new Error("Email inválido");
            }
            const hashPassword = yield (0, bcrypt_1.hash)(password, 8);
            const newUser = yield prisma_1.default.users.create({
                data: {
                    name,
                    email,
                    password_hash: hashPassword,
                    role,
                    imageUrl: imageUser || null
                }
            });
            return newUser;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.users.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
        });
    }
    listByID(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            if (!id) {
                throw new Error("O ID do usuário é obrigatório!");
            }
            return yield prisma_1.default.users.findFirst({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, email, password, role }) {
            if (!id) {
                throw new Error("O ID do usuário é obrigatório!");
            }
            if (!(yield this.userAlreadyExist(undefined, id))) {
                throw new Error("O usuário requerido não existe!");
            }
            // Cria objeto de atualização dinamicamente
            const updatedUser = Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name })), (email && { email })), (password && { password_hash: yield (0, bcrypt_1.hash)(password, 8) })), (role && { role }));
            return yield prisma_1.default.users.update({
                where: { id },
                data: updatedUser,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
        });
    }
    delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            if (!id) {
                throw new Error("O ID do usuário é obrigatório!");
            }
            if (!(yield this.userAlreadyExist(undefined, id))) {
                throw new Error("O usuário requerido não existe!");
            }
            return yield prisma_1.default.users.delete({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
        });
    }
    updateImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.users.update({
                where: { id: data.id },
                data: { imageUrl: data.imageUrl },
            });
        });
    }
}
exports.UserService = UserService;
;
