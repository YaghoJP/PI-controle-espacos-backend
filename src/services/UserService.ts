import prisma from "../prisma";
import {hash} from 'bcrypt';

//Interfaces
import { CreateUserInterface } from "../interfaces/UserInterface";
import { ListUserInterface } from "../interfaces/UserInterface";
import { UpdateUserInterface } from "../interfaces/UserInterface";
import { DeleteUserInterface } from "../interfaces/UserInterface";

//CRUD -> CREATE | READ | UPDATE | DELETE
class UserService {

    async userAlreadyExist(email: string = '', id:number = null):Promise<boolean>{
        
        if(email){
            const userAlreadyExist = await prisma.users.findFirst({
                where:{
                    email
                }
            });
            if(userAlreadyExist){ 
                return true;
            }
        }

        if(id){
            const userAlreadyExist = await prisma.users.findFirst({
                where:{
                    id:id
                }
            });
            if(userAlreadyExist){ 
                return true;
            }
        }

        return false;

    }

    async create({name, email, password, role}: CreateUserInterface){
            
        if (!name || !email || !password) {
            throw new Error("Credenciais de Nome, Email e Senha são obrigatórios.");
        }

        if (email && !/\S+@\S+\.\S+/.test(email)) {
            throw new Error("Email inválido");
        }

        const hashPassword = await hash(password, 8);

        const newUser = await prisma.users.create({
                data:{
                    name,
                    email, 
                    password_hash:hashPassword,
                    role
                }
            })
        return newUser;
    }

    async list() {
        return await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
        });
    }

    async listByID({id}:ListUserInterface) {
        if (!id) {
        throw new Error("O ID do usuário é obrigatório!");
        }

        return await prisma.users.findFirst({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
        });
    }

    async update({ id, name, email, password, role }:UpdateUserInterface) {

    if (!id) {
      throw new Error("O ID do usuário é obrigatório!");
    }

    if (!(await this.userAlreadyExist(undefined, id))) {
      throw new Error("O usuário requerido não existe!");
    }

    // Cria objeto de atualização dinamicamente
    const updatedUser: any = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password_hash: await hash(password, 8) }),
      ...(role && { role }),
    };

    return await prisma.users.update({
      where: { id },
      data: updatedUser,
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
  }

    async delete({id}: DeleteUserInterface) {
        if (!id) {
            throw new Error("O ID do usuário é obrigatório!");
        }

        if (!(await this.userAlreadyExist(undefined, id))) {
            throw new Error("O usuário requerido não existe!");
        }

        return await prisma.users.delete({
            where: { id },
            select: {
            id: true,
            name: true,
            email: true,
            role: true
            }
        });
    }
};

export {UserService};