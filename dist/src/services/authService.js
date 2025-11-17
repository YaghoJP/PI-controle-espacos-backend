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
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../prisma"));
class AuthService {
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            //Validando se o usuario existe
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    email
                }
            });
            if (!user)
                throw new Error('Usuario/Senha incorreto(s)!');
            const passwordIsValid = yield (0, bcrypt_1.compare)(password, user.password_hash);
            if (!passwordIsValid)
                throw new Error('Usuario/Senha incorreto(s)!');
            const token = (0, jsonwebtoken_1.sign)({
                id: user.name,
                email: user.email,
                role: user.role
            }, process.env.JWT_SECRET, {
                subject: String(user.id),
                expiresIn: '3d'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthService = AuthService;
