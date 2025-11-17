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
exports.default = seedUsers;
const prisma_1 = __importDefault(require("../../src/prisma"));
const bcrypt_1 = require("bcrypt");
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield (0, bcrypt_1.hash)('123123', 10);
        const users = [
            { name: "Yagho Petini", email: "yagho@seed.com", password_hash: hashPassword, role: "ASSOCIADO" },
            { name: "Juliano Petini", email: "juliano@seed.com", password_hash: hashPassword, role: "ADMIN" },
            { name: "Lourdes Petini", email: "lpeti@seed.com", password_hash: hashPassword, role: "ASSOCIADO" },
            { name: "Sidinei Petini", email: "sidpeti@seed.com", password_hash: hashPassword, role: "ADMIN" },
            { name: "Rafaela Moises", email: "rafam@seed.com", password_hash: hashPassword, role: "ADMIN" },
            { name: "Galo doido", email: "galo@seed.com", password_hash: hashPassword, role: "ADMIN" },
        ];
        for (const user of users) {
            yield prisma_1.default.users.create({
                data: user
            });
        }
        console.log("Usuarios populados.");
    });
}
