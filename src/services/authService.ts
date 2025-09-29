import {sign} from 'jsonwebtoken';
import {hash, compare} from 'bcrypt';
import { AuthLoginInterface } from '../interfaces/AuthInterface';
import prisma from '../prisma';

class AuthService{
    async login({email, password}:AuthLoginInterface){

        //Validando se o usuario existe
        const user = await prisma.users.findFirst({
            where:{
                email
            }
        });

        if(!user) throw new Error('Usuario/Senha incorreto(s)!');

        const passwordIsValid = await compare(password, user.password_hash);

        if(!passwordIsValid) throw new Error('Usuario/Senha incorreto(s)!');

        const token = sign(
            {
                id: user.name,
                email: user.email
            },
            process.env.JWT_SECRET ,
            {
                subject: String(user.id),
                expiresIn:'3d'
            }
        );
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            token:token
        }
    }
}

export {AuthService};
