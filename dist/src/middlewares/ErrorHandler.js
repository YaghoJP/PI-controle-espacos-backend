"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = HandleError;
function HandleError(err, req, res, next) {
    console.log('Erro interno', err);
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor.';
    res.status(status).json({ error: message });
}
