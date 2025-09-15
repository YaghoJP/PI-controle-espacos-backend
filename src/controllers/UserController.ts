import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { Role } from "../interfaces/UserInterface";

class UserController{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    async handleCreate(req: Request, res: Response, next: NextFunction){
        try{

            const {name, email, password, role} = req.body;

            return res.status(201).json(
                await this.userService.create(
                    {
                        name,
                        email, 
                        password,
                        role
                    }
                )
            );
        }catch(error: any){
            next(error);
        }
    }

  async handleList(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(await this.userService.list());
    } catch (error: any) {
      next(error);
    }
  }

  async handleUpdate(req: Request, res: Response, next: NextFunction) {
        try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        return res.status(200).json(
            await this.userService.update({
            id: Number(id)!,
            name,
            email,
            password,
            role: role as Role,
            })
        );
        } catch (error: any) {
        next(error);
        }
    }

  async handleDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      return res.status(200).json(
        await this.userService.delete({
          id: Number(id)!,
        })
      );
    } catch (error: any) {
      next(error);
    }
  }

  async handleListByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      return res.status(200).json(
        await this.userService.listByID({
          id: Number(id)!,
        })
      );
    } catch (error: any) {
      next(error);
    }
  }
}

export {UserController};