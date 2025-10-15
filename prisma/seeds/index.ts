import seedUsers from "./user.seed";
import prisma from "../../src/prisma";
import seedSpaces from "./space.seed";

async function main() {
    console.log('Iniciando o seed...');

    await prisma.users.deleteMany();
    await prisma.spaces.deleteMany();

    await seedSpaces();
    await seedUsers();
    
    console.log('Seed finalizada com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });