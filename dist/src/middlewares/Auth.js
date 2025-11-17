"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
const jsonwebtoken_1 = require("jsonwebtoken");
function authenticateUser(req, res, next) {
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Token invalido.');
        }
        const token = authHeader.split(' ')[1];
        const { id, role } = (0, jsonwebtoken_1.verify)(token, SECRET_KEY);
        req.user_id = id;
        req.user_role = role;
        return next();
    }
    catch (error) {
        next(error);
    }
}
