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
exports.ReservationController = void 0;
const ReservationService_1 = require("../services/ReservationService");
class ReservationController {
    constructor() {
        this.service = new ReservationService_1.ReservationService();
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json(yield this.service.create(req.body));
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.service.list());
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.status(200).json(yield this.service.listByID({ id: Number(id) }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.status(200).json(yield this.service.update(Object.assign({ id: Number(id) }, req.body)));
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                return res.status(200).json(yield this.service.delete({ id: Number(id) }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ReservationController = ReservationController;
