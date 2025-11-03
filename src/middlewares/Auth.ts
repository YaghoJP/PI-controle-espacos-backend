import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AuthTokenInterface } from "../interfaces/AuthInterface";

export function authenticateUser(req: Request, res: Response, next: NextFunction){
    try {

        const SECRET_KEY = process.env.JWT_SECRET;

        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new Error('Token invalido.');
        }

        const token = authHeader.split(' ')[1];

        const { id, role } = verify(token, SECRET_KEY) as AuthTokenInterface;
        
        req.user_id = id;
        req.user_role = role;

        return next();
    }catch(error:any){
        next(error);
    }
}