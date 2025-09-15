import { Request, Response, NextFunction } from "express";


export function HandleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
){
    console.log('Erro interno', err);

    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor.';

    res.status(status).json({error: message});
}  