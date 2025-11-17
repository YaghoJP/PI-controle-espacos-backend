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
const user_seed_1 = __importDefault(require("./user.seed"));
const prisma_1 = __importDefault(require("../../src/prisma"));
const space_seed_1 = __importDefault(require("./space.seed"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Iniciando o seed...');
        yield prisma_1.default.users.deleteMany();
        yield prisma_1.default.spaces.deleteMany();
        yield (0, space_seed_1.default)();
        yield (0, user_seed_1.default)();
        console.log('Seed finalizada com sucesso!');
    });
}
main()
    .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}));
