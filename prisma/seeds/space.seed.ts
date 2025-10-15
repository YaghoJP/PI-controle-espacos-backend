import prisma from "../../src/prisma";

export default async function seedSpaces() {

    const spaces = [
        { name: "Auditório Central", description: "Espaço amplo para eventos e palestras", capacity: 100, available: true },
        { name: "Sala de Reuniões 01", description: "Sala equipada com projetor e ar condicionado", capacity: 12, available: true },
        { name: "Quadra Poliesportiva", description: "Área aberta para atividades físicas e recreativas", capacity: 50, available: true },
        { name: "Laboratório de Informática", description: "Laboratório com 20 computadores", capacity: 20, available: true },
        { name: "Sala de Estudos", description: "Ambiente silencioso para estudo individual ou em grupo", capacity: 15, available: false },
    ];

    for (const space of spaces) {
        await prisma.spaces.create({
            data: space
        });
    }

    console.log("Espaços populados.");
}
