import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.project.deleteMany().catch(() => {});

    await prisma.project.create({
        data: {
            name: 'A B C',
            slug: 'a-b-c',
            userId: 'abc123',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
