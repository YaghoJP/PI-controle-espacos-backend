import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";

class AuthController{
    private authService: AuthService;

    constructor(){
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body;

            const userSession = await this.authService.login({email, password});

            return res.status(200).json(userSession);
        }catch(error:any){
            next(error);
        }
    }
}

export {AuthController};