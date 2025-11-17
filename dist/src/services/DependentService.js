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
exports.DependentService = void 0;
class DependentService {
    constructor(prisma) {
        this.prisma = prisma;
        this.serialize = (row) => {
            var _a, _b;
            return ({
                id: row.id,
                user_id: row.user_id,
                name: (_a = row.name) !== null && _a !== void 0 ? _a : null,
                birth_date: row.birth_date ? new Date(row.birth_date).toISOString() : null,
                relationship: (_b = row.relationship) !== null && _b !== void 0 ? _b : null,
                created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
            });
        };
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield this.prisma.dependents.create({
                data: this.mapCreateData(data),
            });
            return this.serialize(created);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.dependents.findMany({ orderBy: { id: "asc" } });
            return items.map(this.serialize);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.dependents.findUnique({ where: { id } });
            return item ? this.serialize(item) : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.prisma.dependents.findUnique({ where: { id } });
            if (!exists)
                return null;
            const updated = yield this.prisma.dependents.update({
                where: { id },
                data: this.mapUpdateData(data),
            });
            return this.serialize(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.prisma.dependents.findUnique({ where: { id } });
            if (!exists)
                return false;
            yield this.prisma.dependents.delete({ where: { id } });
            return true;
        });
    }
    mapCreateData(d) {
        return Object.assign(Object.assign(Object.assign(Object.assign({ user_id: d.user_id }, (d.name !== undefined ? { name: d.name } : {})), (d.birth_date !== undefined ? { birth_date: new Date(d.birth_date) } : {})), (d.relationship !== undefined ? { relationship: d.relationship } : {})), { created_at: d.created_at ? new Date(d.created_at) : new Date() });
    }
    mapUpdateData(d) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (d.user_id !== undefined ? { user_id: d.user_id } : {})), (d.name !== undefined ? { name: d.name } : {})), (d.birth_date !== undefined ? { birth_date: new Date(d.birth_date) } : {})), (d.relationship !== undefined ? { relationship: d.relationship } : {})), (d.created_at !== undefined ? { created_at: new Date(d.created_at) } : {}));
    }
}
exports.DependentService = DependentService;
