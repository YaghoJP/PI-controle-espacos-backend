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
exports.default = seedSpaces;
const prisma_1 = __importDefault(require("../../src/prisma"));
function seedSpaces() {
    return __awaiter(this, void 0, void 0, function* () {
        const spaces = [
            { name: "Auditório Central", description: "Espaço amplo para eventos e palestras", capacity: 100, available: true },
            { name: "Sala de Reuniões 01", description: "Sala equipada com projetor e ar condicionado", capacity: 12, available: true },
            { name: "Quadra Poliesportiva", description: "Área aberta para atividades físicas e recreativas", capacity: 50, available: true },
            { name: "Laboratório de Informática", description: "Laboratório com 20 computadores", capacity: 20, available: true },
            { name: "Sala de Estudos", description: "Ambiente silencioso para estudo individual ou em grupo", capacity: 15, available: false },
        ];
        for (const space of spaces) {
            yield prisma_1.default.spaces.create({
                data: space
            });
        }
        console.log("Espaços populados.");
    });
}
