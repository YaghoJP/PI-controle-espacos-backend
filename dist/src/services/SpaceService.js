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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceService = void 0;
class SpaceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(data)) {
                const createdSpaces = yield this.prisma.$transaction(data.map((space) => this.prisma.spaces.create({
                    data: this.mapCreateData(space),
                })));
                return createdSpaces.map((item) => {
                    const { created_at } = item, rest = __rest(item, ["created_at"]);
                    return Object.assign(Object.assign({}, rest), { createdAt: created_at });
                });
            }
            else {
                const created = yield this.prisma.spaces.create({
                    data: this.mapCreateData(data),
                });
                const _a = created, { created_at } = _a, rest = __rest(_a, ["created_at"]);
                return Object.assign(Object.assign({}, rest), { createdAt: created_at });
            }
        });
    }
    mapCreateData(d) {
        return {
            name: d.name,
            description: d.description,
            capacity: d.capacity,
            available: d.available,
            created_at: new Date(),
            image_url: d.imageUrl || null,
        };
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.spaces.findMany({ orderBy: { id: "asc" } });
            return items.map((item) => {
                const { created_at } = item, rest = __rest(item, ["created_at"]);
                return Object.assign(Object.assign({}, rest), { createdAt: created_at });
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.spaces.findUnique({ where: { id } });
            if (!item)
                return null;
            const _a = item, { created_at } = _a, rest = __rest(_a, ["created_at"]);
            return Object.assign(Object.assign({}, rest), { createdAt: created_at });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.prisma.spaces.findUnique({ where: { id } });
            if (!exists)
                return null;
            const updated = yield this.prisma.spaces.update({
                where: { id },
                data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (data.name !== undefined ? { name: data.name } : {})), (data.description !== undefined ? { description: data.description } : {})), (data.capacity !== undefined ? { capacity: data.capacity } : {})), (data.available !== undefined ? { available: data.available } : {})), (data.createdAt !== undefined ? { createdAt: data.createdAt } : {})), (data.imageUrl !== undefined ? { image_url: data.imageUrl } : {})),
            });
            // Map created_at to createdAt for SpaceDTO
            const _a = updated, { created_at } = _a, rest = __rest(_a, ["created_at"]);
            return Object.assign(Object.assign({}, rest), { createdAt: created_at });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.prisma.spaces.findUnique({ where: { id } });
            if (!exists)
                return false;
            yield this.prisma.spaces.delete({ where: { id } });
            return true;
        });
    }
}
exports.SpaceService = SpaceService;
