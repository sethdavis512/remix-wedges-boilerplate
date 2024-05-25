import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.project.deleteMany();

        await prisma.project.create({
            data: {
                name: 'ABC',
                slug: 'a-b-c',
            },
        });
    } catch (error) {
        console.log(error);
    }
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
