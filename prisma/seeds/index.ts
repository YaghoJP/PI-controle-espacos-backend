import seedUsers from "./user.seed";
import prisma from "../../src/pisma";

async function main() {
    console.log('Iniciando o seed...');

    await prisma.users.deleteMany();

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