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

            const imageUrl = req.file ? `/uploads/users/${req.file.filename}` : null;

            return res.status(201).json(
                await this.userService.create(
                    {
                        name,
                        email, 
                        password,
                        role,
                        imageUser:imageUrl
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
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" });
      }

      const imageUrl = `/uploads/users/${req.file.filename}`;

      const updated = await this.userService.updateImage({
        id: userId,
        imageUrl,
      });

      return res.status(200).json(updated);
    } catch (error: any) {
      next(error);
    }
  }
}

export {UserController};