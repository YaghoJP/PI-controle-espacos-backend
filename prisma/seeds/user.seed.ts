
import prisma from "../../src/prisma";
import { hash } from "bcrypt";

export default async function seedUsers() {
    
    const hashPassword = await hash('123123', 10);

    const users = [
        {name:"Yagho Petini", email:"yagho@seed.com", password_hash: hashPassword, role: "ASSOCIADO"},
        {name:"Juliano Petini", email:"juliano@seed.com", password_hash: hashPassword, role: "ADMIN"},
        {name:"Lourdes Petini", email:"lpeti@seed.com", password_hash: hashPassword, role: "ASSOCIADO"},
        {name:"Sidinei Petini", email:"sidpeti@seed.com", password_hash: hashPassword, role: "ADMIN"},
        {name:"Rafaela Moises", email:"rafam@seed.com", password_hash: hashPassword, role: "ADMIN"},
        {name:"Galo doido", email:"galo@seed.com", password_hash: hashPassword, role: "ADMIN"},
    ];
    
    for(const user of users){
        await prisma.users.create(
            {
                data:user
            }
        );
    }

    console.log("Usuarios populados.");
}